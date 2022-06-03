import "./AuthForm.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { BaseURL } from "../../environment";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { authFormVisible } from "../../redux/actions";

function AuthForm(props) {
  const [authFormType, setAuthFormType] = useState(props.authFormType);
  const [newEmail, setNewEmail] = useState("");

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        show={true}
        onClose={() => {
          props.onClose();
          // dispatch(authFormVisible(false));
        }}
      >
        {authFormType === "login" ? (
          <LoginForm setAuthFormType={setAuthFormType} />
        ) : authFormType === "sign-up" ? (
          <SignUpForm
            setAuthFormType={setAuthFormType}
            setNewEmail={setNewEmail}
          />
        ) : authFormType === "register" ? (
          <RegisterForm newEmail={newEmail} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default AuthForm;
