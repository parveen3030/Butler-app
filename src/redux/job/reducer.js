import * as Actions from "./constants";
import { notificationMessage } from "../../utils/error";
import { errorInit as initError } from "../configuration";
import { REHYDRATE } from "redux-persist/lib/constants";

const initState = {
  jobs: [],
  jobsError: initError,
  jobInvites: [],
  jobInvitesError: initError,
  homeData: null,
  homeDataError: initError,
};

function jobReducer(state = initState, action) {
  switch (action.type) {
    case Actions.GET_JOBS_SUCCESS:
      return { ...state, jobs: action.payload };
    case Actions.GET_JOBS_ERROR:
      const errorJobs = notificationMessage(action.payload);
      return {
        ...state,
        jobsError: errorJobs,
      };

    case Actions.GET_JOB_INVITES_SUCCESS:
      return {
        ...state,
        jobInvites: action.payload,
      };
    case Actions.GET_JOB_INVITES_ERROR:
      const errorJobInvites = notificationMessage(action.payload);
      return {
        ...state,
        jobInvitesError: errorJobInvites,
      };

    case Actions.GET_HOME_DATA_SUCCESS:
      return {
        ...state,
        homeData: action.payload,
      };
    case Actions.GET_HOME_DATA_ERROR:
      const errorHomeData = notificationMessage(action.payload);
      return {
        ...state,
        homeDataError: errorHomeData,
      };  

    case REHYDRATE:
      if (action.payload && action.payload.common) {
        return state;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default jobReducer;
