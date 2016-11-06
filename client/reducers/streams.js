import _ from 'lodash'
import { combineReducers } from 'redux'

export const byId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return {
        ...state,
        [action.stream.id]: action.stream,
      }
    case 'REMOVE_STREAM':
      return _.omit(state, action.stream.id)
    default:
      return state
  }
}

export const idsByConnectionId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_STREAM':
      return {
        ...state,
        [action.stream.connection.id]:
          (state[action.stream.connection.id] || []).concat(action.stream.id)
      }
    case 'REMOVE_CONNECTION':
      return _.omit(state, action.connection.id)
    case 'REMOVE_STREAM':
      return {
        ...state,
        [action.stream.connection.id]:
          (state[action.stream.connection.id] || []).filter(
            streamId => streamId !== action.stream.id)
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
  idsByConnectionId,
})

// Selectors

export const get = (state, id) => {
  return state.byId[id] || null
}

export const getAll = (state) => {
  return _.values(state.byId)
}

export const getConnectionStreams = (state, connectionId) => {
  if (!connectionId) {
    console.log('Must pass a connection id to get connection streams')
    return []
  }
  return _.filter(
    _.values(state.byId), stream => stream.connection.id === connectionId)
}

export const getNodeId = (state, stream) => {
  if (!stream || !stream.id) {
    console.log('Must pass a stream to get the node ide')
    return null
  }
  return `stream-${stream.id}`
}
