import _ from 'lodash'
import md5 from 'md5'
import { combineReducers } from 'redux'
import { v4 } from 'uuid'

const createName = () => {
  const firstNames = [
    'Hank',
    'Phil',
    'Jamie',
    'Krissy',
    'Jemma',
    'Cat',
    'Doug',
    'Gina',
    'Marc',
    'Sammie',
  ]
  const lastNames = [
    'Paulson',
    'Kaperty',
    'Shmitzz',
    'Sorrell',
    'the Great',
    'Buffington',
    'Wiserty',
    'Camillo',
    'Grobby',
    'Cruncher',
  ]
  const firstName = firstNames[_.random(0, firstNames.length - 1)]
  const lastName = lastNames[_.random(0, lastNames.length - 1)]
  return `${firstName} ${lastName}`
}

const createUser = () => {
  const id = v4()

  return {
    id,
    imageUrl: `https://gravatar.com/avatar/${md5(id)}?d=monsterid&f=y`,
    name: createName(),
  }
}

const currentUser = (state=createUser(), action) => {
  return state
}

const byId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.user.id]: action.user
      }
    default:
      return state
  }
}

export default combineReducers({
  byId,
  currentUser,
})

// Selectors

export const getCurrentUser = (state) => {
  return state.currentUser
}
