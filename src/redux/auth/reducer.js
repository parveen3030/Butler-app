import { REHYDRATE } from "redux-persist/lib/constants";
import * as Actions from "./constants";
import { notificationMessage } from "../../utils/error";
import { errorInit as initError } from "../configuration";

const initState = {
  isLogin: false,
  pending: false,
  userPhoneNumber: "",
  user: {},
  token: null,
  loginError: initError,
  loginLoading: false,
  signupStep: -1,
  signupProcess: [],
  signUpProcessData: null,
};

function authReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.SIGN_IN_WITH_EMAIL_REQUEST:
      return { ...state, pending: true, loginError: initError };
    case Actions.SIGN_IN_WITH_EMAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLogin: true,
        token: action.payload.token,
      };
    case Actions.SIGN_IN_WITH_EMAIL_ERROR:
      const errorSignIn = notificationMessage(action.payload);
      return { ...state, pending: false, loginError: errorSignIn };
    case Actions.SIGN_UP_PROCESSS_NAVIGATE_SUCCESS:
      return {
        ...state,
        signupStep: action.payload.signupStep,
        signUpProcessData: action.payload.signUpProcessData,
        token: action.payload?.token || state.token,
      };
    case Actions.SIGN_UP_PROCESSS_DATA:
      return { ...state, signUpProcessData: action.signUpProcessData };
    case Actions.HOME_STACK_NAVIGATE:
      return { ...state, isLogin: true };
    case Actions.UPDATE_USER:
      return { ...state, user: action.userData };
    case Actions.STORE_PHONE_NUMBER:
      return { ...state, userPhoneNumber: action.data };
    case Actions.LOG_OUT:
      return { ...initState };
    // return { ...state, isLogin: false, token: null, user: {} };
    case REHYDRATE:
      if (action.payload && action.payload.auth) {
        let { auth } = action.payload;
        return state; //{...auth};
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default authReducer;
