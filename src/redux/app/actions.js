import * as Actions from "./constants";

export function setAppLoading(payload) {
  return {
    type: Actions.APP_SET_LOADING,
    payload,
  };
}