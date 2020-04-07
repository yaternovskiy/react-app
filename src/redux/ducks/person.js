import { put, takeEvery, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import { v4 as uuidv4 } from 'uuid'
import undoable from 'redux-undo'

import { appName } from '../../config'
import { SUCCESS, ERROR, START } from '../constants'

const PeopleRecord = new Record({
  entities: [],
})

const PersonRecord = Record({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
})

/**
 *  CONSTANTS
 */

const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON_REQUESTED = `${prefix}/REQUESTED`
const ADD_PERSON_SUCCESS = `${prefix}/${SUCCESS}`

const UNDO = `${moduleName.toUpperCase()}_UNDO`
const REDO = `${moduleName.toUpperCase()}_REDO`

const undoableConfig = {
  undoType: UNDO,
  redoType: REDO,
}

/**
 *  REDUCERS
 **/

export const personReducer = undoable((state = PeopleRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (v) =>
        state.entities.concat(PersonRecord(payload))
      )
    default:
      return state
  }
}, undoableConfig)

/**
 *  SELECTOR
 */

export const getPeople = (state) => {
  return state[moduleName] && state[moduleName].present.entities
}

export const canPeopleUndo = (state) => state[moduleName].past.length
export const canPeopleRedo = (state) => state[moduleName].future.length

/**
 * SAGAS
 **/

function* addPersonSaga(action) {
  const id = yield call(uuidv4)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: {
      ...action.payload,
      id,
    },
  })
}

export function* saga(action) {
  yield takeEvery(ADD_PERSON_REQUESTED, addPersonSaga)
}
