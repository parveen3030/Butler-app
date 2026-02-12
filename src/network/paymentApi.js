import { getRequest, postRequest, putRequest } from "./api";
import { handleError } from "../utils/error";
import { ADD_CARD, GET_CARD } from "./endpoints";

export async function postCard(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(ADD_CARD, data);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function getAllCards(id) {
  return new Promise(async (resolve, reject) => {
    console.log("path==", `${GET_CARD}/${id}`);
    try {
      const response = await getRequest(`${GET_CARD}/${id}`);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
