import _ from 'lodash'
import { combineReducers } from 'redux'

export const byId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        [action.message.id]: action.message
      }
    default:
      return state
  }
}

export const visible = (state=true, action) => {
  switch (action.type) {
    case 'TOGGLE_MESSAGES_VISIBLE':
      return !state
    default:
      return state
  }
}

export default combineReducers({
  byId,
  visible,
})

// Selectors

export const getAll = (state) => {
  return _.sortBy(_.values(state.byId), 'timestamp')
}

export const getVisible = (state) => {
  return state.visible
}