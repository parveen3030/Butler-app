// saga.js
import { put, call, takeLatest } from "redux-saga/effects";
import * as Actions from "./constants";
import {
  getChatRooms,
  getSupportChat,
  getDiscussionChat,
  getActiveChat,
} from "../../network/chatApi";
import { handleError } from "../../utils/error";

// Get all chat rooms
function* getChatRoomsSaga() {
  try {
    const data = yield call(getChatRooms);
    if (data?.[0]?.data) {
      yield put({
        type: Actions.GET_CHATROOMS_SUCCESS,
        payload: data[0].data,
      });
    } else {
      handleError(data || '');
      yield put({
        type: Actions.GET_CHATROOMS_ERROR,
        payload: { message: data || '' },
      });
    }
  } catch (e) {
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_CHATROOMS_ERROR,
      payload: { message: e?.message || '' },
    });
  }
}

// Get support chat rooms
function* getSupportChatsSaga(action) {
  try {
    const { pageSize = 100, pageNumber = 1 } = action.data || {};
    const data = yield call(getSupportChat, pageSize, pageNumber);
    if (data?.[0]?.data) {
      yield put({
        type: Actions.GET_SUPPORT_CHATS_SUCCESS,
        payload: data[0].data,
      });
    } else {
      handleError(data || '');
      yield put({
        type: Actions.GET_SUPPORT_CHATS_ERROR,
        payload: { message: data || '' },
      });
    }
  } catch (e) {
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_SUPPORT_CHATS_ERROR,
      payload: { message: e?.message || '' },
    });
  }
}

// Get discussion chat rooms
function* getDiscussionChatsSaga(action) {
  try {
    const { pageSize = 100, pageNumber = 1 } = action.data || {};
    const data = yield call(getDiscussionChat, pageSize, pageNumber);
    if (data?.[0]?.data) {
      yield put({
        type: Actions.GET_DISCUSSION_CHATS_SUCCESS,
        payload: data[0].data,
      });
    } else {
      handleError(data || '');
      yield put({
        type: Actions.GET_DISCUSSION_CHATS_ERROR,
        payload: { message: data || '' },
      });
    }
  } catch (e) {
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_DISCUSSION_CHATS_ERROR,
      payload: { message: e?.message || '' },
    });
  }
}

// Get active chat rooms by type
function* getActiveChatsSaga(action) {
  try {
    const { roomType = 'openchat', pageSize = 100, pageNumber = 1 } = action.data || {};
    const data = yield call(getActiveChat, roomType, pageSize, pageNumber);
    if (data?.[0]?.data) {      
      yield put({
        type: Actions.GET_ACTIVE_CHATS_SUCCESS,
        payload: data[0].data,
      });
    } else {
      handleError(data || '');
      yield put({
        type: Actions.GET_ACTIVE_CHATS_ERROR,
        payload: { message: data || '' },
      });
    }
  } catch (e) {
    handleError(e?.response?.data || '');
    yield put({
      type: Actions.GET_ACTIVE_CHATS_ERROR,
      payload: { message: e?.message || '' },
    });
  }
}

export default function* chatSaga() {
  yield takeLatest(Actions.GET_CHATROOMS_REQUEST, getChatRoomsSaga);
  yield takeLatest(Actions.GET_SUPPORT_CHATS_REQUEST, getSupportChatsSaga);
  yield takeLatest(Actions.GET_DISCUSSION_CHATS_REQUEST, getDiscussionChatsSaga);
  yield takeLatest(Actions.GET_ACTIVE_CHATS_REQUEST, getActiveChatsSaga);
}