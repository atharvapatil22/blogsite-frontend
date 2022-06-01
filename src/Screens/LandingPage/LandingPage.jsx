import React from "react";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-nav">
        <p>Blogomo</p>
        <div>
          <button id="login-btn" type="button" onClick={() => {}}>
            Login
          </button>
          <button id="get-started-btn" type="button" onClick={() => {}}>
            Get Started
          </button>
        </div>
      </div>
      <div className="banner">Banner</div>
      <div className="mini-home">Mini Home</div>
    </div>
  );
}

export default LandingPage;
