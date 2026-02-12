import { postRequest } from './api';
import { USER_LOGIN, USER_SIGNUP } from './endpoints';

export const loginWithEmail = data => postRequest(USER_LOGIN, data);

export const signupWithEmail = data => postRequest(USER_SIGNUP, data);
