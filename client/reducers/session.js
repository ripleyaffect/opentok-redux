import { combineReducers } from 'redux'

const session = (state=null, action) => {
  switch (action.type) {
    case 'CONNECT_TO_SESSION_SUCCESS':
      return action.session
    default:
      return state
  }
}

const sessionId = (state=null, action) => {
  switch (action.type) {
    case 'FETCH_TOKEN_REQUEST':
      return null
    case 'FETCH_TOKEN_SUCCESS':
      return action.sessionId
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

export default combineReducers({
  tokboxApiKey,
  session,
  sessionId,
  token,
})

// Selectors

export const get = (state) => state.session

export const getConnection = (state) => (get(state) || {}).connection || null

export const getConnectionId = (state) => (getConnection(state) || {}).id || null

export const getId = (state) => state.sessionId

export const getTokboxApiKey = (state) => state.tokboxApiKey

export const getToken = (state) => state.token
