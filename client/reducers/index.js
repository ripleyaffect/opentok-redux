import { combineReducers } from 'redux'

import messages, * as fromMessages from './messages'
import publishers from './publishers'
import streams, * as fromStreams from './streams'
import subscribers from './subscribers'

export const value = (state=0, action) => {
  switch (action.type) {
    case 'DECREMENT':
      return state - 1
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}


export const tokboxApiKey = (state=null, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN_REQUEST':
      return null
    case 'FETCH_TOKEN_SUCCESS':
      return action.tokboxApiKey
    default:
      return state
  }
}

export const sessionId = (state=null, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN_REQUEST':
      return null
    case 'FETCH_TOKEN_SUCCESS':
      return action.sessionId
    default:
      return state
  }
}

export const session = (state=null, action) => {
  switch (action.type) {
    case 'CONNECT_TO_SESSION_SUCCESS':
      return action.session
    case 'SUBSCRIBE_TO_STREAM_SUCCESS':
      return action.session
    default:
      return state
  }
}

export const token = (state=null, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN_REQUEST':
      return null
    case 'FETCH_TOKEN_SUCCESS':
      return action.token
    default:
      return state
  }
}

export const app = combineReducers({
  messages,
  publishers,
  streams,
  subscribers,
  session,
  sessionId,
  tokboxApiKey,
  token,
})

// Selectors

export const getAllMessages = (state) => {
  return fromMessages.getAll(state.messages)
}

export const getStream = (state, streamId) => {
  return fromStreams.get(state.streams, streamId)
}
export const getAllStreams = (state) => {
  return fromStreams.getAll(state.streams)
}
