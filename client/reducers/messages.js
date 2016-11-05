import _ from 'lodash'
import { combineReducers } from 'redux'

const defaultState = {
  1: {
    id: 1,
    content: 'asdf 1',
  },
  2: {
    id: 2,
    content: 'asdf 2',
  },
  3: {
    id: 3,
    content: 'asdf 3',
  }
}

export const byId = (state=defaultState, action) => {
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
