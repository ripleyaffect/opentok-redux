import { combineReducers } from 'redux'

const byId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_CONNECTION':
      return {
        ...state,
        [action.connection.id]: action.connection,
      }
    case 'REMOVE_CONNECTION':
      return _.omit(state, action.connection.id)
    default:
      return state
  }
}

const idByUserId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.user.id]: action.connectionId,
      }
    case 'REMOVE_CONNECTION':
      return _.omitBy(state, value => value !== action.connection.id)
    default:
      return state
  }
}

export default combineReducers({
  byId,
  idByUserId,
})

// Selectors

export const get = (state, id) => state.byId[id] || null

export const getByUserId = (state, userId) =>
  get(state, state.idByUserId[userId])
