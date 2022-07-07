import React from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();
  const store = useSelector((state) => state);
  const userLoggedIn = store.globalData.authUser;
  console.log(userLoggedIn);

  if (
    location.pathname == "/landing-page" ||
    location.pathname == "/write-blog"
  )
    return null;
  return (
    <>
      <div className={`${styles.nav_top} ${styles.show_for_mobile}`}>
        <Link to={"/home"}>
          <div className={styles.home_link_mobile}>
            <img src={require("../../assets/cogito_logo.png")} />
          </div>
        </Link>
        <div></div>
      </div>
      <header className={styles.navbar_container}>
        <nav className={styles.navbar_body}>
          <div className={`${styles.brand_logo} ${styles.hide_for_mobile}`}>
            <Link to={"/home"}>
              <div className={styles.home_link}>
                <img src={require("../../assets/cogito_logo.png")} />
              </div>
            </Link>
          </div>

          <div className={styles.navbar_menu}>
            <ul>
              <li>
                <Link to={"/home"}>
                  <div className={styles.navbar_link}>
                    <BiHomeAlt fontSize={"2em"} />
                  </div>
                </Link>
              </li>
              <li>
                <Link to={"/write-blog"}>
                  <div className={styles.navbar_link}>
                    <TiEdit fontSize={"2em"} />
                  </div>
                </Link>
              </li>
              <li className={`${styles.profile_nav} ${styles.show_for_mobile}`}>
                <Link to={"/profile"}>
                  <img
                    src={
                      userLoggedIn
                        ? userLoggedIn.avatar
                        : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                    }
                  />
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.profile_nav}>
            <Link to={"/profile"}>
              <img
                src={
                  userLoggedIn
                    ? userLoggedIn.avatar
                    : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                }
              />
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
