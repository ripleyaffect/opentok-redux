import _ from 'lodash'
import { combineReducers } from 'redux'

const activeId = (state=null, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_CONNECTION':
      console.log(state, action)
      return !state || (action.timestamp > state.timestamp) ?
        _.pick(action, ['connectionId', 'timestamp']) : state
    case 'REMOVE_ACTIVE_CONNECTION':
      return null
    default:
      return state
  }
}

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
  activeId,
  byId,
  idByUserId,
})

// Selectors

export const get = (state, id) => state.byId[id] || null

export const getActive = (state) => get(state, getActiveId(state))

export const getActiveId = (state) => {
  return (state.activeId || {}).connectionId || null
}
export const getActiveTimestamp = (state) => {
  return (state.activeId || {}).timestamp || null
}

export const getByUserId = (state, userId) =>
  get(state, state.idByUserId[userId])
