import "./Home.css";

import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";

function Home() {
  return (
    <div className="home-container">
      <div className="home-body">Home Screen</div>
      <Sidebar />
    </div>
  );
}

export default Home;
