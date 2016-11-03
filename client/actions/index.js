import OT from 'opentok-client-sdk'
import superagent from 'superagent'

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
          const { apiKey, sessionId, token } = response.body
          dispatch({
            type: 'FETCH_TOKEN_SUCCESS',
            apiKey,
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
    const { apiKey, sessionId, token } = getState()

    // Initialize the session
    const session = OT.initSession(apiKey, sessionId)

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

export const publishToSession = () => {
  return (dispatch, getState) => {
    // Pull session from the state
    const { session } = getState()

    // Initialize the publisher
    const publisher = OT.initPublisher(
      'publisher',
      {
        insertMode: 'append',
        width: '100%',
        height: '100%',
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

export const subscribeToStream = (event) => {
return (dispatch, getState) => {
    // Pull session from the state
    const { session } = getState()

    // Initialize the publisher
    session.subscribe(
      event.stream,
      'subscriber',
      {
        insertMode: 'append',
        width: '100%',
        height: '100%',
      })

    // Dispatch the publisher
    dispatch({
      type: 'SUBSCRIBE_TO_STREAM_SUCCESS',
      session: Object.assign({}, session),
    })
  }
}