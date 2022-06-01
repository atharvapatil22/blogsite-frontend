import axios from "axios";
import React, { useState } from "react";
import { BaseURL } from "../../environment";
import "./AuthForm.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  authFormVisible,
  authTokenSet,
  authUserSet,
} from "../../redux/actions";

function RegisterForm(props) {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [errMsg1, setErrMsg1] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [errMsg3, setErrMsg3] = useState("");

  const dispatch = useDispatch();

  const validateFields = () => {
    if (!fullname) setErrMsg1("Field cannot be empty!");
    if (!password) setErrMsg2("Field cannot be empty!");
    else {
      const validPassword = String(password).match(
        /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,20}$/
      );

      if (!validPassword) {
        if (password.length > 20 || password.length < 8)
          setErrMsg2("Password must be 8-20 characters!");
        else if (password.search(/[a-z]/i) < 0) {
          setErrMsg2("Password must contain at least one letter!");
        } else if (password.search(/[0-9]/) < 0) {
          setErrMsg2("Password must contain at least one digit!");
        } else setErrMsg2("Invalid Characters!");
      } else if (password != confirmPassword) {
        setErrMsg3("Passwords do not match!");
      } else if (!!fullname) registerUser();
    }
  };

  const registerUser = () => {
    axios
      .post(BaseURL + "/users", {
        email: props.newEmail,
        fullname: fullname,
        password: password,
      })
      .then((res) => {
        console.log(
          "User Registered successfully. User automatically logged in"
        );
        const userData = res.data.user;
        const authToken = userData.accessToken;

        dispatch(authTokenSet(authToken));
        dispatch(authUserSet(userData));
        // NAV TO HOME PAGE
        dispatch(authFormVisible(false));
      })
      .catch((err) => {
        alert("Some Error occured");
        console.log("Error: ", err?.response);
      });
  };

  return (
    <div className="form-body">
      <p className="form-banner"> Almost There</p>

      <form
        className="register-form"
        onSubmit={(event) => {
          event.preventDefault();
          // validateFields();
        }}
      >
        <label>Email</label>
        <input
          type={"text"}
          disabled
          value={props.newEmail}
          id="disabled-input"
        />
        <p className="err-msg"></p>

        <label>Your Full Name</label>
        <input
          maxLength={60}
          type={"text"}
          value={fullname}
          onChange={(event) => {
            const val = event.target.value;
            if (val != "") setErrMsg1("");
            setFullname(val);
          }}
        />
        <p className="err-msg">{errMsg1}</p>

        <label>Set Password</label>
        <div className="password-input">
          <input
            maxLength={20}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => {
              const val = event.target.value;
              if (val != "") setErrMsg2("");
              setPassword(val);
            }}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <AiFillEye size={"1.5em"} />
            ) : (
              <AiFillEyeInvisible size={"1.5em"} />
            )}
          </button>
        </div>

        <p className="err-msg">{errMsg2}</p>

        <label>Confirm Password</label>
        <div className="password-input">
          <input
            maxLength={20}
            type={showPassword2 ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              const val = event.target.value;
              if (val != "") setErrMsg3("");
              setConfirmPassword(val);
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword2(!showPassword2)}
          >
            {showPassword2 ? (
              <AiFillEye size={"1.5em"} />
            ) : (
              <AiFillEyeInvisible size={"1.5em"} />
            )}
          </button>
        </div>
        <p className="err-msg">{errMsg3}</p>

        <button onClick={validateFields} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
