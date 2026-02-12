import { combineReducers } from "redux";

import app from "./app/reducer";
import authReducer from "./auth/reducer";
import chatReducer from "./chat/reducer";
import jobReducer from "./job/reducer";

const rootReducers = combineReducers({
	app: app,
	auth: authReducer,
	chat: chatReducer,
	job: jobReducer,	
});

export default rootReducers;
