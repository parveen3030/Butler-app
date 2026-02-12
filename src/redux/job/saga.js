import {put, call, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {handleError} from '../../utils/error';
import * as Actions from './constants';
import {getJobs, getJobInvites, getHomeData} from '../../network/jobApi';
import { setAppLoading } from "../app/actions";

function* getHomeDataSaga() {
  setAppLoading(true)

  try {
    const data = yield call(getHomeData);
    setAppLoading(false)
    if (data) {
      yield put({
        type: Actions.GET_HOME_DATA_SUCCESS,
        payload: data
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_HOME_DATA_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_HOME_DATA_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

function* getJobsSaga() {
  try {
    const data = yield call(getJobs);
    console.log('data is', data);
    if (
      data?.data
    ) {
      yield put({
        type: Actions.GET_JOBS_SUCCESS,
        payload: data?.data
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_JOBS_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_JOBS_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

function* getJobInvitesSaga() {
  try {
    yield put(setAppLoading(true));
    const data = yield call(getJobInvites, "PENDING");
    yield put(setAppLoading(false));
    console.log('getJobInvites is', data);
    if (
      data?.data
    ) {
      yield put({
        type: Actions.GET_JOB_INVITES_SUCCESS,
        payload: data?.data,
      });
    } else {
      handleError(data ? data : '');
      yield put({
        type: Actions.GET_JOB_INVITES_ERROR,
        payload: {
          message: data ? data : '',
        },
      });
    }
  } catch (e) {
    console.log('e', e.response);
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_JOB_INVITES_ERROR,
      payload: {
        message: e && e.message ? e.message : '',
      },
    });
  }
}

export default function* jobSaga() {
  yield takeLatest(Actions.GET_HOME_DATA_REQUEST, getHomeDataSaga);
  yield takeLatest(Actions.GET_JOBS_REQUEST, getJobsSaga);
  yield takeLatest(Actions.GET_JOB_INVITES_REQUEST, getJobInvitesSaga);
}