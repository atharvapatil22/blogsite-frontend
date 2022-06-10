import axios from "axios";
import React, { useState } from "react";
import { BaseURL } from "../../environment";
import "./AuthForm.css";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function SignUpForm(props) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const verifyEmail = () => {
    if (!email) {
      setErrorMsg("Email cannot be empty!");
      return;
    }
    const validEmail = String(email).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!validEmail) {
      setErrorMsg("Please enter valid email!");
      return;
    }
    setShowLoader(true);
    axios
      .post(BaseURL + "/users/verify-email", { email: email })
      .then((res) => {
        if (res.status === 200) {
          props.setNewEmail(email);
          props.setAuthFormType("register");
        }
        setShowLoader(false);
      })
      .catch((err) => {
        setErrorMsg(err?.response?.data?.message);
        console.log("Error: ", err?.response);
        setShowLoader(false);
      });
  };

  return (
    <div className="form-body">
      <p className="form-banner"> Create New Account</p>
      <div className="create-account-email">
        <p>Enter your Email Address to proceed</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // verifyEmail();
          }}
          className={"create-account-form"}
        >
          <input
            maxLength={40}
            name="email"
            type={"email"}
            value={email}
            onChange={(newVal) => setEmail(newVal.target.value.toLowerCase())}
          />
          <button
            disabled={showLoader ? true : false}
            className={`form-btn ${showLoader ? "form-btn-disabled" : ""}`}
            onClick={verifyEmail}
            type="submit"
          >
            <div>
              Continue
              {showLoader && <SpinnerLoader />}
            </div>
          </button>
        </form>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </div>
      <div className="create-account-label">
        Already have an account?
        <button
          className="create-account-btn"
          onClick={() => props.setAuthFormType("login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SignUpForm;
