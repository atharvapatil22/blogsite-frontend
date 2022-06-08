import "./AuthForm.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import SignUpForm from "./SignUpForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation, useNavigate } from "react-router-dom";

function AuthForm(props) {
  /* @Authentication Form Component
   *
   * Types -> This component can render 3 types of sub-forms: login, sign-up, register
   * Props ->
   *   1) {required} hideForm: function executed when from is to be hidden
   *   2) {required} type: used to set initial form type
   *   3) {optional} message: used to override default banner message
   *
   * If user closes form they will always be redirected to '/' route
   * If user completes Login/Register they will be redirected to '/' route
   */
  const [type, setType] = useState(props.type);
  const [newEmail, setNewEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Modal
        show={true}
        onClose={() => {
          props.hideForm();
          if (location.pathname != "/landing-page") navigate("/");
        }}
      >
        {type === "login" ? (
          <LoginForm
            setAuthFormType={setType}
            message={props.message ? props.message : ""}
            hideForm={props.hideForm}
          />
        ) : type === "sign-up" ? (
          <SignUpForm setAuthFormType={setType} setNewEmail={setNewEmail} />
        ) : type === "register" ? (
          <RegisterForm newEmail={newEmail} hideForm={props.hideForm} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default AuthForm;
