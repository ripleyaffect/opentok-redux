import { combineReducers } from 'redux'

import messages, * as fromMessages from './messages'
import publishers from './publishers'
import session, * as fromSession from './session'
import streams, * as fromStreams from './streams'
import subscribers from './subscribers'

export const app = combineReducers({
  messages,
  publishers,
  session,
  streams,
  subscribers,
})

// Selectors

export const getAllMessages = (state) => {
  return fromMessages.getAll(state.messages)
}

export const getTokboxApiKey = (state) => {
  return fromSession.getTokboxApiKey(state.session)
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

export const getStream = (state, streamId) => {
  return fromStreams.get(state.streams, streamId)
}
export const getAllStreams = (state) => {
  return fromStreams.getAll(state.streams)
}
export const getStreamNodeId = (state, stream) => {
  return fromStreams.getNodeId(state.streams, stream)
}