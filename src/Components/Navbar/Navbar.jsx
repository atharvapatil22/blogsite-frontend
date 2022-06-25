import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";

function Navbar() {
  const location = useLocation();

  if (
    location.pathname == "/landing-page" ||
    location.pathname == "/write-blog"
  )
    return null;
  return (
    <header className="navbar-container">
      <nav className="navbar-body">
        <div className="brand-logo hide-for-mobile">
          <Link to={"/home"}>
            <div className="home-link">
              <img src={require("../../assets/cogito_logo.png")} />
            </div>
          </Link>
        </div>

        <div className="navbar-menu">
          <ul>
            <li>
              <Link to={"/home"}>
                <div className="navbar-link">
                  <BiHomeAlt fontSize={"2em"} />
                </div>
              </Link>
            </li>
            <li>
              <Link to={"/write-blog"}>
                <div className="navbar-link">
                  <TiEdit fontSize={"2em"} />
                </div>
              </Link>
            </li>
            <li className="profile-nav show-for-mobile">
              <Link to={"/profile"}>
                <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="profile-nav hide-for-mobile">
          <Link to={"/profile"}>
            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
