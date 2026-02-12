import * as Actions from "./constants";

export function getJobs(data) {
  return {
    type: Actions.GET_JOBS_REQUEST,
    data,
  };
}

export function getJobInvites() {
  return {
    type: Actions.GET_JOB_INVITES_REQUEST,
  };
}

export function getHomeData() {
  return {
    type: Actions.GET_HOME_DATA_REQUEST,
  };
}