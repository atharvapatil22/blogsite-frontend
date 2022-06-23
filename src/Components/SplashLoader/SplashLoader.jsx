import React from "react";
import "./SplashLoader.css";

function SplashLoader() {
  return (
    <div className="splash-loader-wrapper">
      <div className="splash-container">
        <div className="splash-loader">
          <img
            className="splash-logo"
            src={require("../../assets/cogito_logo.png")}
            alt=""
          />
        </div>
      </div>
      <p className="splash-text">Authenticating</p>
    </div>
  );
}

export default SplashLoader;
