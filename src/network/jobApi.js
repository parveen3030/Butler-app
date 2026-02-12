import { GET_JOBS, GET_JOB_INVITES, GET_HOMEDATA } from "./endpoints";
import { getRequest, putRequest } from "./api";
import { handleError } from "../utils/error";

export const getJobs = () => getRequest(GET_JOBS);

export const getJobInvites = status => getRequest(GET_JOB_INVITES, {q: status});

export const getHomeData = () => getRequest(GET_HOMEDATA)

export async function getJobDetail(jobID) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_JOB_INVITES + "/" + jobID);
      console.log("getJobDetail response is", response);

      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function acceptJobInvite(jobID, acceptStatus) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await putRequest(
        "job/me/invites/" + jobID + `?accepted=${acceptStatus}`
      );
      console.log("acceptJobInvite response is", response);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
