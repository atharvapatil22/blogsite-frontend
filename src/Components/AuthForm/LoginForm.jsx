import axios from "axios";
import React, { useState } from "react";
import { BaseURL } from "../../environment";
import "./AuthForm.css";

function LoginForm({ setVisibleForm }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
          console.log("Response: ", res);
          alert("Login successful");
        })
        .catch((err) => {
          console.log("Error:", err?.response);
          if (err.response.data.message) {
            setErrorMsg(err.response.data.message);
          }
        });
    }
  };

  return (
    <div className="form-body">
      <p className="form-banner"> Welcome Back!</p>
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
          onClick={() => setVisibleForm("sign-up")}
        >
          Create One
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
