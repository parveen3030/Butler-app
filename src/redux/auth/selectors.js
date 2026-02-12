import {createSelector} from 'reselect';

export const auth = state => state.auth;

export const tokenSelector = createSelector(
  auth,
  data => data.token,
);

export const authSelector = createSelector(
  auth,
  data => data,
);

export const userDataSelector = createSelector(
  auth,
  data => data.user,
);

export const isLoginSelector = createSelector(
  auth,
  data => data.isLogin,
);

export const signupProcessStepSelector = createSelector(
  auth,
  data => data.signupStep,
);

export const signUpProcessDataSelector = createSelector(
  auth,
  data => data.signUpProcessData,
);
