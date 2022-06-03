import React from "react";
import "./LandingPage.css";
import "../../assets/logo.png";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="banner">
        <div className="landing-main">
          <div id="box1"></div>
          <div id="box2">
            <div id="text">Stay curious.</div>
          </div>
          <div id="box2a">
            <div id="sub-text">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </div>
          </div>
          <div id="box3">
            <div id="nav-container">
              <div id="logo">
                <img src={require("../../assets/logo.png")} />
              </div>
              <div id="menu">
                <ul>
                  <li>
                    <button type="button">About</button>
                  </li>
                  <li>
                    <button type="button">Login</button>
                  </li>
                  <li>
                    <button type="button">Get Started</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mini-home">Mini Home</div>
    </div>
  );
}

export default LandingPage;
