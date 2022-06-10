import React from "react";
import "./SplashLoader.css";

function SplashLoader() {
  return (
    <div className="splash-loader-wrapper">
      <div class="splash-container">
        <div class="splash-loader">
          <img
            className="splash-logo"
            src={require("../../assets/logo.png")}
            alt=""
          />
        </div>
      </div>
      <p className="splash-text">Authenticating</p>
    </div>
  );
}

export default SplashLoader;
