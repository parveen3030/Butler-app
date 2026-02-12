import * as Actions from "./constants";

export function getChatRooms() {
  return {
    type: Actions.GET_CHATROOMS_REQUEST,
  };
}

export function getSupportChats(data) {
	return {
		type: Actions.GET_SUPPORT_CHATS_REQUEST,
		data,
	};
}

export function getDiscussionChats(data) {
	return {
		type: Actions.GET_DISCUSSION_CHATS_REQUEST,
		data,
	};
}

export function getActiveChats(data) {
	return {
		type: Actions.GET_ACTIVE_CHATS_REQUEST,
		data,
	};
}
