
import { combineReducers } from 'redux'

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


export const apiKey = (state=null, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN_REQUEST':
      return null
    case 'FETCH_TOKEN_SUCCESS':
      return action.apiKey
    default:
      return state
  }
}

export const publisher = (state=null, action) => {
  switch (action.type) {
    case 'PUBLISH_TO_SESSION_SUCCESS':
      return action.publisher
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
  apiKey,
  publisher,
  session,
  sessionId,
  token,
  value,
})