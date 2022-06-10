import React from "react";
import "./SpinnerLoader.css";

function SpinnerLoader() {
  return (
    <div class="spin-container">
      <div class="spin-loader spin-loader-1">
        <div class="spin-loader-outter"></div>
        <div class="spin-loader-inner"></div>
      </div>
    </div>
  );
}

export default SpinnerLoader;
