import { AUTH_FORM_VISIBLE, AUTH_TOKEN_SET, AUTH_USER_SET } from "./types";

export const authUserSet = (authUserData) => {
  return {
    type: AUTH_USER_SET,
    payload: authUserData,
  };
};

export const authTokenSet = (authTokenData) => {
  return {
    type: AUTH_TOKEN_SET,
    payload: authTokenData,
  };
};

export const authFormVisible = (formVisible) => {
  return {
    type: AUTH_FORM_VISIBLE,
    payload: formVisible,
  };
};
