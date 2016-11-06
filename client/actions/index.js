import OT  from 'opentok-client-sdk'
import superagent from 'superagent'
import { v4 } from 'uuid'

import {
  getCurrentUser,
  getSession,
  getSessionConnectionId,
  getSessionId,
  getSessionToken,
  getStreamNodeId,
  getTokboxApiKey,
} from 'app/reducers'

export const fetchSessionToken = (room) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_TOKEN_REQUEST',
    })

    superagent.
      get(`/api/rooms/${room}/token`).
      end((error, response) => {
        if (error) {
          console.log(`An error occured: ${error}`)
        }
        else {
          const { tokboxApiKey, sessionId, token } = response.body
          dispatch({
            type: 'FETCH_TOKEN_SUCCESS',
            tokboxApiKey,
            sessionId,
            token,
          })
        }
      })
  }
}

export const connectToSession = () => {
  return (dispatch, getState) => {
    // Get values from the state
    const state = getState()
    const sessionId = getSessionId(state)
    const tokboxApiKey = getTokboxApiKey(state)
    const token = getSessionToken(state)

    // Initialize the session
    const session = OT.initSession(tokboxApiKey, sessionId)

    // Connect to the session
    session.connect(token, (error) => {
      if (error) {
        console.log('There was an error connecting to the session')
        return
      }

      // Dispatch the session if no error
      dispatch({
        type: 'CONNECT_TO_SESSION_SUCCESS',
        session,
      })
    })
  }
}

export const publishToSession = (options) => {
  return (dispatch, getState) => {
    // Pull session from the state
    const session = getSession(getState())

    // Passed options take precedence over defaults
    const defaultOptions = {
      width: '100px',
      height: '80px',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    // Initialize the publisher
    const publisher = OT.initPublisher('publisher-container', finalOptions)

    // Publish to the session
    session.publish(publisher)

    // Dispatch the publisher
    dispatch({
      type: 'PUBLISH_TO_SESSION_SUCCESS',
      publisher,
    })
  }
}

export const subscribeToStream = (stream, options={}) => {
  return (dispatch, getState) => {
    const state = getState()
    const session = getSession(state)

    // Passed options take precedence over defaults
    const defaultOptions = {
      height: 'calc(100vh - 75px)',
      width: '100%',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    const subscriber = session.subscribe(
      stream, getStreamNodeId(state, stream), finalOptions)

    console.log(subscriber)

    dispatch({
      type: 'STREAM_SUBSCRIBER_CREATED',
      stream,
      subscriber,
    })
  }
}

export const handleConnectionCreated = (event) => {
  return (dispatch, getState) => {
    const state = getState()
    const connectionId = getSessionConnectionId(state)
    const session = getSession(state)
    const user = getCurrentUser(state)

    // Short circuit if no connection Id
    if (!connectionId) {
      console.log('Cannot identify without a connectionId')
      return
    }

    session.signal({
      type: 'identify',
      to: event.connection,
      data: {
        connectionId,
        user,
      }
    })

    dispatch({
      connection: event.connection,
      type: 'ADD_CONNECTION',
    })
  }
}

export const handleConnectionDestroyed = (event) => ({
  connection: event.connection,
  type: 'REMOVE_CONNECTION',
})

export const handleSignalIdentify = (event) => ({
  ...event.data,
  type: 'ADD_USER',
})

export const handleSignalMessage = (event) => ({
  ...event.data,
  type: 'ADD_MESSAGE',
})

export const handleStreamCreated = (event) => ({
  stream: event.stream,
  type: 'ADD_STREAM',
})

export const handleStreamDestroyed = (event) => ({
  stream: event.stream,
  type: 'REMOVE_STREAM',
})

export const signalJoinPing = () => {
  return (dispatch) => {
    dispatch(signalMessage({ type: 'joinPing' }))
  }
}

export const signalMessage = (options) => {
  return (dispatch, getState) => {
    const state = getState()
    const session = getSession(state)
    const user = getCurrentUser(state)

    const defaultOptions = {
      content: null,
      type: 'text',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    const message = {
      ...finalOptions,
      id: v4(),
      user,
    }

    session.signal({
      data: {
        message
      },
      type: 'message',
    })

    dispatch({
      message,
      type: 'ADD_MESSAGE',
    })
  }
}
