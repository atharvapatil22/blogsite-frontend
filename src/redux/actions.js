import { AUTH_TOKEN_SET, AUTH_USER_SET } from "./types";

export const authUserSet = (authUserData) => {
  return {
    type: AUTH_USER_SET,
    payload: authUserData,
  };
};

// export const authTokenSet = (authTokenData) => {
//   return {
//     type: AUTH_TOKEN_SET,
//     payload: authTokenData,
//   };
// };
