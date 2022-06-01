import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducer";

const store = createStore(
  combineReducers({
    globalData: authReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
