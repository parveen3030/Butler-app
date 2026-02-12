import * as Actions from "./constants";

/**
 * Action login
 * @param loginData
 * @returns {{type: string, loginData: object}}
 */
export function signInWithEmail(loginData) {
  return {
    type: Actions.SIGN_IN_WITH_EMAIL_REQUEST,
    loginData,
  };
}

export function setUserPhoneNumber(data) {
  return {
    type: Actions.STORE_PHONE_NUMBER,
    data,
  };
}

/**
 * Action signup
 * @param loginData
 * @returns {{type: string, signupData: object}}
 */
export function signUpWithEmail(signupData) {
  return {
    type: Actions.SIGN_UP_WITH_EMAIL_REQUEST,
    signupData,
  };
}

export function signInSuccess(data) {
  return {
    type: Actions.SIGN_IN_SUCCESS,
    data,
  };
}

/**
 * Action signup process navigate
 * @param signupStepsData
 * @param signUpProcessData
 * @returns {{type: string, signupStepsData: object, signUpProcessData: object}}
 */
export function signUpProcessNavigate(signupStepsData, signUpProcessData) {
  return {
    type: Actions.SIGN_UP_PROCESSS_NAVIGATE,
    signupStepsData,
    signUpProcessData,
  };
}

/**
 * Action signup process user data
 * @param signUpProcessData
 * @returns {{type: string, signUpProcessData: object}}
 */
export function signUpProcessData(signUpProcessData) {
  return {
    type: Actions.SIGN_UP_PROCESSS_DATA,
    signUpProcessData,
  };
}

/**
 * Action home stack navigate
 */
export function homeStackNavigate() {
  return {
    type: Actions.HOME_STACK_NAVIGATE,
  };
}

/**
 * Action update user
 * @param userData
 * @returns {{type: string, userData: object}}
 */
export function updateUser(userData) {
  return {
    type: Actions.UPDATE_USER,
    userData,
  };
}

/**
 * Action logout
 */
export function logout() {
  return {
    type: Actions.LOG_OUT,
  };
}
