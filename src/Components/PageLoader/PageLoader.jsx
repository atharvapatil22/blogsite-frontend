import React from "react";
import "./PageLoader.css";

function PageLoader() {
  return (
    <div className="circle-loader-wrapper">
      <div className="circle">
        <div className="inner"></div>
      </div>
    </div>
  );
}

export default PageLoader;
