import OT  from 'opentok-client-sdk'
import superagent from 'superagent'
import { v4 } from 'uuid'

import {
  getActiveConnectionId,
  getActiveConnectionTimestamp,
  getCurrentUser,
  getIsActiveConnection,
  getSession,
  getSessionConnectionId,
  getSessionId,
  getSessionToken,
  getStreamNodeId,
  getStreamSubscriber,
  getTokboxApiKey,
  getUserByConnectionId,
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
      showControls: false,
      width: '100%',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    const subscriber = session.subscribe(
      stream, getStreamNodeId(state, stream), finalOptions)

    dispatch({
      type: 'ADD_SUBSCRIBER',
      stream,
      subscriber,
    })
  }
}

export const unsubscribeFromStream = (stream) => {
  return (dispatch, getState) => {
    const state = getState()
    const session = getSession(state)
    const subscriber = getStreamSubscriber(state, stream)

    if (subscriber) {
      session.unsubscribe(subscriber)
    }

    dispatch({
      type: 'REMOVE_SUBSCRIBER',
      stream,
    })
  }
}

export const addMessage = (message) => {
  // Add id if needed
  if (!message.id) {
    message.id = v4()
  }
  if (!message.timestamp) {
    message.timestamp = Date.now()
  }
  return {
    message,
    type: 'ADD_MESSAGE',
  }
}

export const addUser = (user, connectionId) => ({
  connectionId,
  type: 'ADD_USER',
  user,
})

export const toggleMessagesVisible = () => ({
  type: 'TOGGLE_MESSAGES_VISIBLE',
})

export const handleSignalActiveConnectionPing = (event) => {
  return (dispatch, getState) => {
    const activeConnectionId = getActiveConnectionId(getState())

    if (event.data.connectionId != activeConnectionId) {
      dispatch(addUser(event.data.user, event.data.connectionId))
      dispatch(handleSignalSetActiveConnectionId(event))
      dispatch(addMessage({
        id: v4(),
        type: 'activeConnectionNotice',
        user: event.data.user,
      }))
    }
  }
}

export const handleConnectionCreated = (event) => {
  return (dispatch, getState) => {
    const state = getState()
    const connectionId = getSessionConnectionId(state)
    const isActiveConnection = getIsActiveConnection(state)
    const session = getSession(state)
    const user = getCurrentUser(state)

    // Short circuit if no connectionId
    if (!connectionId) {
      console.log('Cannot identify without a connectionId')
      return
    }

    // The new connection doesn't pick up on signals immediately :/
    setTimeout(() => {
      session.signal({
        type: 'identify',
        to: event.connection,
        data: {
          connectionId,
          user,
        }
      })
    }, 1000)

    // Tell new connection if this connection is the active one
    if (isActiveConnection) {
      dispatch(signalActiveConnectionPing(event.connection))
    }

    dispatch({
      connection: event.connection,
      type: 'ADD_CONNECTION',
    })
  }
}

export const handleConnectionDestroyed = (event) => {
  return (dispatch, getState) => {
    const user = getUserByConnectionId(getState(), event.connection.id)

    if (user) {
      dispatch(addMessage({ type: 'leavePing', user }))
    }

    dispatch({
      connection: event.connection,
      userId: user ? user.id : null,
      type: 'REMOVE_CONNECTION',
    })
  }
}

export const handleSignalIdentify = (event) => {
  return dispatch => {
    dispatch(addUser(event.data.user, event.data.connectionId))
  }
}

export const handleSignalMessage = (event) => {
  return (dispatch) => dispatch(addMessage(event.data.message))
}

export const handleSignalSetActiveConnectionId = (event) => ({
  ...event.data,
  type: 'SET_ACTIVE_CONNECTION',
})

export const handleStreamCreated = (event) => {
  return {
    stream: event.stream,
    type: 'ADD_STREAM',
  }
}

export const handleStreamDestroyed = (event) => ({
  stream: event.stream,
  type: 'REMOVE_STREAM',
})

export const handleSignalSubscribeToUserAudio = (event) => {
  return (dispatch, getState) => {
    const user = getCurrentUser(getState())

    // Never add self to subcribed audio
    if (user.id !== event.data.user.id) {
      dispatch({
        ...event.data,
        type: 'ADD_USER_AUDIO',
      })
    }
  }
}

export const handleSignalUnsubscribeFromUserAudio = (event) => ({
  ...event.data,
  type: 'REMOVE_USER_AUDIO',
})

export const signalActiveConnectionPing = (to) => {
  return (dispatch, getState) => {
    const state = getState()
    const connectionId = getSessionConnectionId(state)
    const session = getSession(state)
    const timestamp = getActiveConnectionTimestamp(state)
    const user = getCurrentUser(state)

    const signalData = {
      type: 'activeConnectionPing',
      data: {
        connectionId,
        timestamp,
        user,
      }
    }

    if (to) {
      signalData.to = to
    }

    session.signal(signalData)
  }
}

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
      id: v4(),
      timestamp: Date.now(),
      type: 'text',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    const message = {
      ...finalOptions,
      user,
    }

    session.signal({
      data: {
        message
      },
      type: 'message',
    })
  }
}

export const signalSetActiveConnectionId = (connectionId) => {
  return (dispatch, getState) => {
    const session = getSession(getState())
    const timestamp = Date.now()

    session.signal({
      type: 'setActiveConnectionId',
      data: {
        connectionId,
        timestamp,
      }
    })

    dispatch({
      connectionId,
      timestamp,
      type: 'SET_ACTIVE_CONNECTION',
    })
  }
}

export const signalSubscribeToUserAudio = () => {
  return (dispatch, getState) => {
    const state = getState()
    const session = getSession(state)
    const user = getCurrentUser(state)

    session.signal({
      type: 'subscribeToUserAudio',
      data: {
        user,
        timestamp: Date.now(),
      }
    })

    dispatch({
      type: 'START_STREAMING_AUDIO',
    })
  }
}

export const signalUnsubscribeFromUserAudio = () => {
  return (dispatch, getState) => {
    const state = getState()
    const session = getSession(state)
    const user = getCurrentUser(state)

    session.signal({
      type: 'unsubscribeFromUserAudio',
      data: {
        user,
        timestamp: Date.now(),
      }
    })

    dispatch({
      type: 'STOP_STREAMING_AUDIO',
    })
  }
}

