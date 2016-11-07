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

const audio = (state=[], action) => {
  switch (action.type) {
    case 'ADD_USER_AUDIO':
      return state.filter(id => id !== action.user.id).concat(action.user.id)
    case 'REMOVE_USER_AUDIO':
      return state.filter(id => id !== action.user.id)
    default:
      return state
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
    case 'REMOVE_CONNECTION':
      return _.omit(state, action.userId)
    default:
      return state
  }
}

const idByConnectionId = (state={}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        [action.connectionId]: action.user.id,
      }
    case 'REMOVE_CONNECTION':
      return _.omitBy(state, value => value !== action.connection.id)
    default:
      return state
  }
}


const isStreamingAudio = (state=false, action) => {
  switch (action.type) {
    case 'START_STREAMING_AUDIO':
      return true
    case 'STOP_STREAMING_AUDIO':
      return false
    default:
      return state
  }
}

export default combineReducers({
  audio,
  byId,
  currentUser,
  idByConnectionId,
  isStreamingAudio,
})

// Selectors

export const get = (state, id) => state.byId[id] || null

export const getAll = (state) => _.values(state.byId)

export const getAudio = (state) => state.audio

export const getByConnectionId = (state, connectionId) => {
  return get(state, state.idByConnectionId[connectionId])
}

export const getCurrentUser = (state) => state.currentUser

export const getIsStreamingAudio = (state) => state.isStreamingAudio
