import { all } from 'redux-saga/effects'
import { saga as authSaga } from './ducks/auth'
import { saga as personSaga } from './ducks/person'

export default function* () {
  yield all([authSaga(), personSaga()])
}
