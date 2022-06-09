import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BaseURL } from "../../environment";
import "./AuthForm.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  authFormVisible,
  authTokenSet,
  authUserSet,
} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import ImgDropAndCrop from "../ImgDropAndCrop/ImgDropAndCrop";

function RegisterForm(props) {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [errMsg1, setErrMsg1] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [errMsg3, setErrMsg3] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myRef = useRef(null);

  useEffect(() => {
    // Set random default avatar
    const randomNumber = Math.floor(Math.random() * 8 + 0);
    setAvatar(defaultAvatars[randomNumber]);
  }, []);

  const updateAvatar = (index) => {
    setAvatar(defaultAvatars[index]);
  };

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

        localStorage.setItem("logged_in", true);
        localStorage.setItem("access_token", authToken);
        dispatch(authUserSet(userData));
        navigate("/home");
        props.hideForm();
      })
      .catch((err) => {
        alert("Some Error occured");
        console.log("Error: ", err?.response);
      });
  };

  return (
    <div className="form-body">
      <p className="form-banner"> Almost There</p>
      {/* <p>Enter all the details</p> */}
      <form
        className="register-form"
        onSubmit={(event) => {
          event.preventDefault();
          // validateFields();
        }}
      >
        <label>Avatar</label>
        <div
          className="avatar-wrapper"
          onClick={() => setShowAvatarSelector(!showAvatarSelector)}
        >
          <img className="selected-avatar" src={avatar} />
          <p className="edit-text">{showAvatarSelector ? "Done" : "Edit"}</p>
        </div>

        {showAvatarSelector && (
          <>
            <p>Choose an avatar:</p>
            <div className="avatar-selector">
              <button
                className="scroll-btn-left scroll-btn"
                type="button"
                onClick={() => (myRef.current.scrollLeft -= 25)}
              >
                <BsChevronCompactLeft size={"1.8em"} />
              </button>
              <div className="scroll-wrapper" ref={myRef}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <div className="avatar-option">
                          <ImgDropAndCrop afterImageLoaded={setAvatar} />
                        </div>
                      </th>
                      {defaultAvatars.map((option, index) => (
                        <th key={index}>
                          <div>
                            <img
                              onClick={() => updateAvatar(index)}
                              className="avatar-option"
                              src={option}
                            ></img>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
              </div>
              <button
                className="scroll-btn-right scroll-btn"
                type="button"
                onClick={() => (myRef.current.scrollLeft += 25)}
              >
                <BsChevronCompactRight size={"1.8em"} />
              </button>
            </div>
          </>
        )}
        <button
          className="avatar-btn"
          type="button"
          onClick={() => setShowAvatarSelector(!showAvatarSelector)}
        >
          {showAvatarSelector ? "Done" : "Edit Avatar"}
        </button>

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

        <button className="submit-btn" onClick={validateFields} type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

const defaultAvatars = [
  require("../../assets/defaultAvatars/male_1.png"),
  require("../../assets/defaultAvatars/female_1.png"),
  require("../../assets/defaultAvatars/male_2.png"),
  require("../../assets/defaultAvatars/female_2.png"),
  require("../../assets/defaultAvatars/male_3.png"),
  require("../../assets/defaultAvatars/female_3.png"),
  require("../../assets/defaultAvatars/male_4.png"),
  require("../../assets/defaultAvatars/female_4.png"),
];
