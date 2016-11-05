import { combineReducers } from 'redux'

export const byId = (state={}, action) => {
  switch (action.type) {
    case 'PUBLISH_TO_SESSION_SUCCESS':
      return {
        ...state,
        [action.publisher.id]: action.publisher
      }
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
