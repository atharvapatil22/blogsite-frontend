import "./AuthForm.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { BaseURL } from "../../environment";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function SignInForm() {
  const [visibleForm, setVisibleForm] = useState("login");
  const [newEmail, setNewEmail] = useState("");

  return (
    <div>
      <Modal show={true} onClose={() => {}}>
        {visibleForm === "login" ? (
          <LoginForm setVisibleForm={setVisibleForm} />
        ) : visibleForm === "sign-up" ? (
          <SignUpForm
            setVisibleForm={setVisibleForm}
            setNewEmail={setNewEmail}
          />
        ) : visibleForm === "register" ? (
          <RegisterForm newEmail={newEmail} />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
}

export default SignInForm;
