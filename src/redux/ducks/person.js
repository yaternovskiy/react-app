import { put, takeEvery, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import { v4 as uuidv4 } from 'uuid'

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

/**
 *  REDUCERS
 **/

export const personReducer = (state = PeopleRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (v) =>
        state.entities.concat(PersonRecord(payload))
      )
    default:
      return state
  }
}

/**
 *  SELECTOR
 */

export const getPeople = (state) => {
  return state[moduleName] && state[moduleName].entities
}

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
