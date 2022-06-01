import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./reducer";

const store = createStore(
  combineReducers({
    authUser: authReducer,
  }),
  applyMiddleware(thunk)
);

export default store;
