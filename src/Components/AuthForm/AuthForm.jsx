import "./AuthForm.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { BaseURL } from "../../environment";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import RegisterForm from "./RegisterForm";

function SignInForm() {
  const [visibleForm, setVisibleForm] = useState("login");
  const [newEmail, setNewEmail] = useState("");

  const LoginForm = () => {
    return (
      <div className="form-body">
        <p className="form-banner"> Welcome Back!</p>
        <p>Login options</p>
        <div className="create-account-label">
          No Account?
          <button
            className="form-btn"
            onClick={() => setVisibleForm("sign-up")}
          >
            Create One
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal show={true} onClose={() => {}}>
        {visibleForm === "login" ? (
          <LoginForm />
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
