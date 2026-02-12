import * as Actions from "./constants";

const initState = {
  isAppLoading: false,
};

function app(state = initState, action) {
  switch (action.type) {
    case Actions.APP_SET_LOADING:
      return { ...state, isAppLoading: action.payload };
    default:
      return state;
  }
}

export default app;
