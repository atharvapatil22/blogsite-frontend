import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../environment";
import {
  authFormVisible,
  authTokenSet,
  authUserSet,
} from "../../redux/actions";
import "./AuthForm.css";

function LoginForm({ setAuthFormType, message, hideForm }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = () => {
    if (!email) {
      setErrorMsg("Email cannot be empty!");
      return;
    } else if (!password) {
      setErrorMsg("Password cannot be empty!");
      return;
    } else {
      axios
        .post(BaseURL + "/users/login", { email: email, password: password })
        .then((res) => {
          console.log("Login successful");
          const userData = res.data.user;
          const authToken = userData.accessToken;

          localStorage.setItem("logged_in", true);
          localStorage.setItem("access_token", authToken);
          dispatch(authUserSet(userData));
          navigate("/home");
          hideForm();
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            console.log("Error:", err.response);
            setErrorMsg(err.response.data.message);
          } else {
            console.log("Error: Some error occured");
          }
        });
    }
  };

  return (
    <div className="form-body">
      {!!message ? (
        <p className="form-banner"> {message}</p>
      ) : (
        <p className="form-banner"> Welcome Back!</p>
      )}

      <div className="login-form-email">
        <p>Enter your Email and Password</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // loginUser();
          }}
          className={"login-form"}
        >
          <input
            placeholder="Email"
            maxLength={40}
            name="email"
            type={"email"}
            value={email}
            onChange={(newVal) => setEmail(newVal.target.value.toLowerCase())}
          />
          <input
            placeholder="Password"
            maxLength={20}
            name="password"
            type={"password"}
            value={password}
            onChange={(newVal) =>
              setpassword(newVal.target.value.toLowerCase())
            }
          />
          <button onClick={loginUser} type="submit">
            Login
          </button>
        </form>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
      <div className="login-form-label">
        No Account?
        <button
          className="login-form-btn"
          onClick={() => setAuthFormType("sign-up")}
        >
          Create One
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
