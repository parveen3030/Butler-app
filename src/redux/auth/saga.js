import AsyncStorage from "@react-native-async-storage/async-storage";
import { put, call, select, takeEvery, takeLatest } from "redux-saga/effects";
import { handleError } from "../../utils/error";
import * as Actions from "./constants";
import { loginWithEmail, signupWithEmail } from "../../network/authApi";
import NavigationService from "../../utils/navigation";
import { signupStepsList } from "../configuration";
import { signInSuccess } from "./actions";
import { setAppLoading } from "../app/actions";

/**
 * Do login success
 * @param token
 * @param user
 * @returns {IterableIterator<*>}
 */
function* doLoginSuccess(token, userData = {}) {
  if (!userData?.isPhoneVerified) {
    yield call(NavigationService.navigate, signupStepsList[0]);
    yield put({
      type: Actions.SIGN_IN_SUCCESS,
      data: "Helososo",
    });
    yield put({
      type: Actions.SIGN_UP_PROCESSS_NAVIGATE_SUCCESS,
      payload: {
        signupStep: 0,
        token: token,
        signUpProcessData: { userType: userData?.userType },
      },
    });
  } else if (!userData?.signUpCompleted) {
    yield call(
      NavigationService.navigate,
      signupStepsList[userData?.userType == "freelancer" ? 3 : 2]
    );
    yield put({
      type: Actions.SIGN_UP_PROCESSS_NAVIGATE_SUCCESS,
      payload: {
        signupStep: userData?.userType == "freelancer" ? 3 : 2,
        token: token,
        signUpProcessData: { userType: userData?.userType },
      },
    });
  } else {
    yield put({
      type: Actions.SIGN_IN_WITH_EMAIL_SUCCESS,
      payload: { token, user: userData },
    });
    yield call(AsyncStorage.setItem, "token", token);
  }
}

/**
 * Sign In saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signInWithEmailSaga({ loginData }) {
  // yield call(doLoginSuccess, '123', {name:'test'});
  try {
    yield put(setAppLoading(true));
    const data = yield call(loginWithEmail, loginData);
    yield put(setAppLoading(false));
    // console.log("data is==", data);
    if (
      data &&
      data.accessToken &&
      data.accessToken.accessToken &&
      data.accessToken.user
    ) {
      yield call(
        doLoginSuccess,
        data.accessToken.accessToken,
        data.accessToken.user
      );
    } else {
      handleError(data ? data : "");
      yield put({
        type: Actions.SIGN_IN_WITH_EMAIL_ERROR,
        payload: {
          message: data ? data : "",
        },
      });
    }
  } catch (e) {
    console.log("1111 err==>", e.response);
    handleError(e?.response?.data || "");
    yield put(setAppLoading(false));
    yield put({
      type: Actions.SIGN_IN_WITH_EMAIL_ERROR,
      payload: {
        message: e && e.message ? e.message : "",
      },
    });
  }
}

/**
 * Sign In saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signUpWithEmailSaga({ signupData }) {
  try {
    const signupDataBody = {
      email: signupData.email,
      password: signupData.password,
      userType: signupData.userType,
    };

    // console.log("signupDataBody", signupDataBody);
    yield put(setAppLoading(true));
    const data = yield call(signupWithEmail, signupDataBody);
    yield put(setAppLoading(false));
    // console.log("res is", data);
    if (
      data &&
      data.accessToken &&
      data.accessToken.accessToken &&
      data.accessToken.user
    ) {
      yield call(
        doLoginSuccess,
        data.accessToken.accessToken,
        data.accessToken.user
      );
    } else {
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_SUCCESS,
        payload: {
          message: data ? data : "",
        },
      });
    }
  } catch (e) {
    console.log("e", e.response);
    handleError(e?.response?.data || "");
    yield put(setAppLoading(false));
    yield put({
      type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
      payload: {
        message: e && e.message ? e.message : "",
      },
    });
  }
}

/**
 * Sign up process navigate saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signUpProcessNavigate({ signupStepsData, signUpProcessData }) {
  yield call(NavigationService.navigate, signupStepsList[signupStepsData.step]);
  yield put({
    type: Actions.SIGN_UP_PROCESSS_NAVIGATE_SUCCESS,
    payload: { signupStep: signupStepsData.step, signUpProcessData },
  });
}

export default function* authSaga() {
  yield takeLatest(Actions.SIGN_IN_WITH_EMAIL_REQUEST, signInWithEmailSaga);
  yield takeEvery(Actions.SIGN_UP_WITH_EMAIL_REQUEST, signUpWithEmailSaga);
  yield takeEvery(Actions.SIGN_UP_PROCESSS_NAVIGATE, signUpProcessNavigate);
}
