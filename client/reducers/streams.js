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

export default combineReducers({
  byId,
})

// Selectors

export const get = (state, id) => {
  return state.byId[id] || null
}

export const getAll = (state) => {
  return _.values(state.byId)
}
