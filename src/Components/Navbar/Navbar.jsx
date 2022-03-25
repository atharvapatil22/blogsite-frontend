import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";

function Navbar() {
  return (
    <header className="navbar-container">
      <nav className="navbar-body">
        <div className="brand-logo">
          <Link to={"/"}>
            <div className="home-link">Blogomo</div>
          </Link>
        </div>

        <div className="navbar-menu">
          <ul>
            <li>
              <Link to={"/"}>
                <BiHomeAlt fontSize={"2em"} color={"red"} />
              </Link>
            </li>
            <li>
              <Link to={"/write-blog"}>
                <TiEdit fontSize={"2em"} color={"red"} />
              </Link>
            </li>
          </ul>
        </div>

        <div className="profile-nav">
          <Link to={"/profile"}>
            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
