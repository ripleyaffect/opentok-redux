import { combineReducers } from 'redux'

import connections, * as fromConnections from './connections'
import messages, * as fromMessages from './messages'
import publishers from './publishers'
import session, * as fromSession from './session'
import streams, * as fromStreams from './streams'
import users, * as fromUsers from './users'

export const app = combineReducers({
  connections,
  messages,
  publishers,
  session,
  streams,
  users,
})

// Selectors

export const getActiveConnectionId = (state) => {
  return fromConnections.getActiveId(state.connections)
}
export const getActiveConnectionTimestamp = (state) => {
  return fromConnections.getActiveTimestamp(state.connections)
}

export const getAllMessages = (state) => {
  return fromMessages.getAll(state.messages)
}

export const getTokboxApiKey = (state) => {
  return fromSession.getTokboxApiKey(state.session)
}
export const getSessionConnectionId = (state) => {
  return fromSession.getConnectionId(state.session)
}
export const getSession = (state) => {
  return fromSession.get(state.session)
}
export const getSessionId = (state) => {
  return fromSession.getId(state.session)
}
export const getSessionToken = (state) => {
  return fromSession.getToken(state.session)
}


export const getConnectionStreams = (state, connectionId) => {
  return fromStreams.getForConnection(state.streams, connectionId)
}
export const getStream = (state, streamId) => {
  return fromStreams.get(state.streams, streamId)
}
export const getAllStreams = (state) => {
  return fromStreams.getAll(state.streams)
}
export const getStreamNodeId = (state, stream) => {
  return fromStreams.getNodeId(state.streams, stream)
}
export const getStreamSubscriber = (state, stream) => {
  return fromStreams.getSubscriber(state.streams, stream)
}

export const getCurrentUser = (state) => {
  return fromUsers.getCurrentUser(state.users)
}

export const getIsActiveConnection = (state) => {
  return getActiveConnectionId(state) === getSessionConnectionId(state)
}