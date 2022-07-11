import React from "react";
import "./SpinnerLoader.css";

function SpinnerLoader({ color }) {
  return (
    <div className="spin-container">
      <div className="spin-loader spin-loader-1">
        <div
          style={{ borderColor: color ? color : "white" }}
          className="spin-loader-outter"
        ></div>
        <div
          style={{ borderColor: color ? color : "white" }}
          className="spin-loader-inner"
        ></div>
      </div>
    </div>
  );
}

export default SpinnerLoader;
