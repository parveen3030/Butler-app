import { store } from "../redux/store";
import axios from "axios";
// import { getLogoutAction } from "../onboarding/actions";
import { API_ENDPOINT } from "../config";
import RNFetchBlob from "react-native-blob-util";
import { UPDATE_PROFILE } from "./endpoints";

export const headerKeys = {
  AccessToken: "Authorization",
  Expiry: "expiry",
  TokenType: "token-type",
  Uid: "uid",
  Client: "client",
};

const api = axios.create({
  baseURL: API_ENDPOINT,
});

api.interceptors.request.use((config) => {
  const token = getApiHeaders();
  // console.log('headers', config.headers, token)
  if (config.headers && token) {
    config.headers[headerKeys.AccessToken] = "Bearer " + token;
    // config.headers[headerKeys.Uid] = headers.uid;
    // config.headers[headerKeys.Client] = headers.client;
    // config.headers[headerKeys.Expiry] = headers.expiry.toString();
    // config.headers[headerKeys.TokenType] = headers.tokenType;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // console.log("error", error);
    if (error.response) {
      console.log("error", error.response);
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
    }
    // return Promise.reject(error);
    return Promise.reject(error);
  }
);

function getApiHeaders() {
  // console.log("store.getState()", store.getState());
  return store.getState().auth.token;
}

function isTokenError(error) {
  const headers = getApiHeaders();
  return headers && error.response && error.response.status === 401;
}

function handleTokenError() {
  // clearData();
  //   store.dispatch(getLogoutAction());
}

export function postRequest(url, body) {
 
  return new Promise((resolve, reject) => {
    api
      .post(url, body)
      .then((response) => {
        // console.log("response", response);
        resolve(response);
      })
      .catch((error) => {
        // console.log("error", error);
        reject(error);
      });
  });
}

export function patchRequest(url, body) {
  return new Promise((resolve, reject) => {
    api
      .patch(url, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function putRequest(url, body) {
  return new Promise((resolve, reject) => {
    api
      .put(url, body)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function RNFetchBlobPutRequest(reqData, url) {
  return new Promise((resolve, reject) => {
    console.log("reqData is", reqData, url);
    const token = getApiHeaders();
    RNFetchBlob.config({
      // trusty: true,
    })
      .fetch(
        "PUT",
        API_ENDPOINT + url,
        {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        reqData
      )
      .then((response) => {
        console.log("response is", response);
        const data = JSON.parse(response.data);

        console.log("data is", data);
        if (data?.updatedUser) {
          resolve(data);
        } else {
          resolve({
            status: false,
          });
        }
      })
      .catch((err) => {
        console.log("error is", err);
        reject(err);
      });
  });
}

export function RNFetchBlobPostRequest(reqData, url) {
  return new Promise((resolve, reject) => {
    console.log("reqData is", reqData, url);
    const token = getApiHeaders();
    RNFetchBlob.fetch(
      "POST",
      API_ENDPOINT + url,
      {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
      reqData
    )
      .then((response) => {
        console.log("response is", response);
        const data = JSON.parse(response.data);

        console.log("data is", data);
        if (data) {
          resolve({
            status: true,
            data: data,
          });
        }
      })
      .catch((err) => {
        console.log("error is", err);
        reject(err);
      });
  });
}

export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    api
      .get(url, { params: params })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {        
        reject(error);
      });
  });
}

export function deleteRequest(url, body) {
  return new Promise((resolve, reject) => {
    api
      .delete(url, { data: body })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
