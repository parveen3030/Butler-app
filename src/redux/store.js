import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
// import { createLogger } from 'redux-logger';

// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

console.disableYellowBox = true;
const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["auth",
		"chat",
		"job"
	],
};

const composeEnhancers =
	// process.env.NODE_ENV === "development"
	// 	? composeWithDevTools({ realtime: true })
	// 	:
		 compose; 

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
// const store = createStore(persistedReducer, enhancer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);