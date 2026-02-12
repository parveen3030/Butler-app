import { getRequest, postRequest, putRequest } from "./api";
import { handleError } from "../utils/error";
import { SEND_RATING } from "./endpoints";

export async function postRating(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(SEND_RATING, data);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
