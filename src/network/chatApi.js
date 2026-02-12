import {
  CREATE_CHATROOM,
  CREATE_SUPPORT_CHAT,
  END_CHAT,
  GET_CHATROOMS,
  GET_CHATROOM_MEESSAGES,
} from "./endpoints";
import { getRequest, postRequest } from "./api";
import { handleError } from "../utils/error";

export const getChatRooms = () => getRequest(GET_CHATROOMS);

export const getSupportChat = (pageSize, pageNumber) => getRequest(
  `${GET_CHATROOMS}?roomType=support&pageSize=${pageSize}&pageNo=${pageNumber}`
);

export const getDiscussionChat = (pageSize, pageNumber) => getRequest(
  `${GET_CHATROOMS}?roomType=openchat&pageSize=${pageSize}&pageNo=${pageNumber}`
);

export const getActiveChat = (roomType, pageSize, pageNumber) => getRequest(
  `${GET_CHATROOMS}?roomType=${roomType}&pageSize=${pageSize}&pageNo=${pageNumber}`
);

export async function getInvoiceDetail(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(`invoice/getByChatRoomId/${id}`);
      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function createSupportChat(data) {
  const postBody = {
    text: data,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(
        `${CREATE_CHATROOM}?support=true`,
        postBody
      );
      console.log("response is", response);
      resolve(response);
    } catch (error) {
      console.log("error is", error);
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function endChatAPI(chatID) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(`${END_CHAT}?chatId=${chatID}`);
      console.log("response is", response);
      resolve(response);
    } catch (error) {
      console.log("error is", error);
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function createChatRoom(name) {
  const postBody = {
    title: name,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const response = await postRequest(CREATE_CHATROOM, postBody);
      resolve(response);
    } catch (error) {
      // console.log("error ==>", error);
      //   handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}

export async function getChatroomMessages(chatRoomId, pageNumber) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await getRequest(GET_CHATROOM_MEESSAGES, {
        chatRoomId: chatRoomId,
        pageNo: pageNumber,
      });
      console.log("getChatroomMessages response is", response);

      resolve(response);
    } catch (error) {
      handleError(error?.response?.data || "");
      reject(error?.response?.data || "");
    }
  });
}
