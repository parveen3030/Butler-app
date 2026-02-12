import * as Actions from "./constants";
import { notificationMessage } from "../../utils/error";
import { errorInit as initError } from "../configuration";

var initState = {
	supportChats: [],
	discussionChats: [],
	activeChats: [],
	chatRooms: [],
	chatRoomsError: initError,	
};

function chatReducer(state = initState, action) {
	switch (action.type) {
		case Actions.GET_CHATROOMS_SUCCESS:
			return { ...state, chatRooms: action.payload};
		case Actions.GET_SUPPORT_CHATS_SUCCESS:			
			return { ...state, supportChats: action.payload };
		case Actions.GET_DISCUSSION_CHATS_SUCCESS:
			return { ...state, discussionChats: action.payload };
		case Actions.GET_ACTIVE_CHATS_SUCCESS:
			return { ...state, activeChats: action.payload };		
		case Actions.GET_SUPPORT_CHATS_ERROR:
		case Actions.GET_DISCUSSION_CHATS_ERROR:
		case Actions.GET_ACTIVE_CHATS_ERROR:	
		case Actions.GET_CHATROOMS_ERROR:
			const errorChatRooms = notificationMessage(action.payload);
			return {...state, chatRoomsError: errorChatRooms};			
		default:
			return state;
	}
}

export default chatReducer;
