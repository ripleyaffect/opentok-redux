import _ from 'lodash'
import { combineReducers } from 'redux'

export const byId = (state={}, action) => {
  switch (action.type) {
    case 'SUBSCRIBE_TO_STREAM_SUCCESS':
      return {
        ...state,
        [action.stream.id]: action.subscriber
      }
    case 'REMOVE_STREAM':
      return _.omit(state, action.stream.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
})

// Selectors

export const get = (state, id) => {
  return state.byId[id] || null
}
