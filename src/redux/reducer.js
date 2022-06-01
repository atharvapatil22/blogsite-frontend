import { AUTH_TOKEN_SET, AUTH_USER_SET } from "./types";

const initialState = {
  authUser: null,
  authToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_SET:
      return {
        ...state,
        authUser: action.payload,
      };

    case AUTH_TOKEN_SET:
      return {
        ...state,
        authToken: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
