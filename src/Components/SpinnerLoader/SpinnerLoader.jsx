import React from "react";
import "./SpinnerLoader.css";

function SpinnerLoader() {
  return (
    <div className="spin-container">
      <div className="spin-loader spin-loader-1">
        <div className="spin-loader-outter"></div>
        <div className="spin-loader-inner"></div>
      </div>
    </div>
  );
}

export default SpinnerLoader;
