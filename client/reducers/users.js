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

const streamingAudio = (state=[], action) => {
  switch (action.type) {
    case 'ADD_USER_AUDIO':
      return state.filter(id => id !== action.user.id).concat(action.user.id)
    case 'REMOVE_USER_AUDIO':
      return state.filter(id => id !== action.user.id)
    case 'REMOVE_CONNECTION':
      return state.filter(id => id !== action.userId)
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
      return _.omit(state, action.connection.id)
    default:
      return state
  }
}


const currentIsStreamingAudio = (state=false, action) => {
  switch (action.type) {
    case 'START_STREAMING_AUDIO':
      return true
    case 'STOP_STREAMING_AUDIO':
      return false
    default:
      return state
  }
}

const listIsVisible = (state=false, action) => {
  switch (action.type) {
    case 'TOGGLE_USER_LIST_VISIBLE':
      return !state
    default:
      return state
  }
}

export default combineReducers({
  streamingAudio,
  byId,
  currentUser,
  idByConnectionId,
  currentIsStreamingAudio,
  listIsVisible,
})

// Selectors

export const get = (state, id) => state.byId[id] || null

export const getAll = (state) => _.sortBy(_.values(state.byId), 'name')

export const getStreamingAudio = (state) => state.streamingAudio

export const getIsStreamingAudio = (state, id) => {
  return state.streamingAudio.indexOf(id) > -1
}

export const getByConnectionId = (state, connectionId) => {
  return get(state, state.idByConnectionId[connectionId])
}

export const getCurrentUser = (state) => state.currentUser

export const getCurrentIsStreamingAudio = (state) => state.currentIsStreamingAudio

export const getListIsVisible = (state) => state.listIsVisible