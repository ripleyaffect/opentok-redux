import _ from 'lodash'
import { combineReducers } from 'redux'

export const byId = (state={}, action) => {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [action.message.id]: action.message
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
})

// Selectors

export const getAll = (state) => {
  return _.sortBy(_.values(state.byId), 'timestamp')
}
