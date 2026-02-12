import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import chatSaga from './chat/saga';
import jobSaga from './job/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    chatSaga(),
    jobSaga(),
  ]);
}
