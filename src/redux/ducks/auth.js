import { put, call, takeEvery } from 'redux-saga/effects'
import { Record } from 'immutable'
import { apiService } from '../../services/api'

import { appName } from '../../config'
import { SUCCESS, ERROR, START } from '../constants'

const AuthRecord = new Record({
  loading: false,
  user: null,
  error: null,
})

/**
 *  CONSTANTS
 */

const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_REQUESTED = `${prefix}/REQUESTED`
const SIGN_UP_START = `${prefix}/${START}`
const SIGN_UP_ERROR = `${prefix}/${ERROR}`
const SIGN_UP_SUCCESS = `${prefix}/${SUCCESS}`

/**
 *  REDUCERS
 **/

export const authReducer = (state = new AuthRecord(), action) => {
  const { type, payload } = action

  switch (type) {
    case SIGN_UP_START:
      return state.set('loading', true).set('error', null)
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user).set('loading', false)
    default:
      return state
  }
}

/**
 *  ACTION CREATORS
 **/

export const createSignUp = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: SIGN_UP_START,
    payload: {},
  })

  try {
    const user = await apiService.auth(email, password).catch((e) => {
      throw e
    })
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user },
    })
  } catch (error) {
    dispatch({
      type: SIGN_UP_ERROR,
      payload: { error },
    })
  }
}

/**
 * SAGAS
 **/

function* signUpSaga(action) {
  const { email, password } = action.payload

  yield put({
    type: SIGN_UP_START,
    payload: {},
  })

  try {
    const user = yield call(apiService.auth, email, password)
    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user },
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      payload: { error },
    })
  }
}

export function* saga(action) {
  yield takeEvery(SIGN_UP_REQUESTED, signUpSaga)
}
