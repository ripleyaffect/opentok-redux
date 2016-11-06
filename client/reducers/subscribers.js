import _ from 'lodash'
import { combineReducers } from 'redux'

export const byStreamId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_SUBSCRIBER':
      return {
        ...state,
        [action.stream.id]: action.subscriber
      }
    case 'REMOVE_STREAM':
    case 'REMOVE_SUBSCRIBER':
      return _.omit(state, action.stream.id)
    default:
      return state
  }
}

export default combineReducers({
  byStreamId,
})

// Selectors

export const get = (state, streamId) => {
  return state.byStreamId[streamId] || null
}
