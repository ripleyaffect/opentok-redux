import OT from 'opentok-client-sdk'
import superagent from 'superagent'
import { v4 } from 'uuid'

import { getStreamNodeId } from 'app/reducers'

export const decrement = () => ({
  type: 'DECREMENT'
})

export const increment = () => ({
  type: 'INCREMENT'
})

export const fetchToken = (room) => {
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
    // Pull values from the state
    const { tokboxApiKey, sessionId, token } = getState()

    // Initialize the session
    const session = OT.initSession(tokboxApiKey, sessionId)

    // Connect to the session
    session.connect(token, (error) => {
      // Dispatch the session
      dispatch({
        type: 'CONNECT_TO_SESSION_SUCCESS',
        session,
      })
    })
  }
}

export const publishToSession = (publishAudio=false, publishVideo=false) => {
  return (dispatch, getState) => {
    // Pull session from the state
    const { session } = getState()

    // Initialize the publisher
    const publisher = OT.initPublisher(
      'publisher-container', {
        width: '100px',
        height: '80px',
      })

    // Publish to the session
    session.publish(publisher)

    // Dispatch the publisher
    dispatch({
      type: 'PUBLISH_TO_SESSION_SUCCESS',
      publisher,
    })
  }
}

export const addStream = (event) => {
  console.log(event)
  return {
    type: 'ADD_STREAM',
    stream: event.stream,
  }
}

export const removeStream = (event) => {
  console.log(event)
  return {
    type: 'REMOVE_STREAM',
    stream: event.stream,
  }
}

export const sendMessage = (messageContent) => {
  return (dispatch, getState) => {
    const { session } = getState()

    const message = {
      content: messageContent,
      id: v4()
    }

    session.signal({
      data: message,
      type: 'message',
    })

    dispatch({
      message,
      type: 'RECEIVE_MESSAGE',
    })
  }
}

export const receiveMessage = (event) => {
  console.log(event)
  return {
    message: event.data,
    type: 'RECEIVE_MESSAGE',
  }
}

export const subscribeToStream = (stream, options={}) => {

  return (dispatch, getState) => {
    const state = getState()
    const session = state.session

    // Passed options take precedence over defaults
    const defaultOptions = {
      height: 'calc(100vh - 75px)',
      width: '100%',
    }
    const finalOptions = _.assign({}, defaultOptions, options)

    const subscriber = session.subscribe(
      stream, getStreamNodeId(state, stream), finalOptions)

    dispatch({
      type: 'STREAM_SUBSCRIBER_CREATED',
      stream,
      subscriber,
    })
  }
}
