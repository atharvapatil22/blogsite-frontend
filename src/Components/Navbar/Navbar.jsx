import React from "react";
import styles from "./Navbar.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { IoMenuSharp } from "react-icons/io5";
import ReactTooltip from "react-tooltip";
import { authUserSet } from "../../redux/actions";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useSelector((state) => state);
  const userLoggedIn = store.globalData.authUser;
  console.log(userLoggedIn);

  const toolTipProps = {
    effect: "solid",
    type: "light",
    border: true,
    borderColor: "grey",
    arrowColor: "white",
    globalEventOff: "click",
    clickable: true,
  };

  const ProfileToolTip = () => {
    return (
      <>
        <a
          onClick={(e) => {
            e.stopPropagation();
            console.log("here");
            navigate("/profile");
          }}
        >
          Profile
        </a>
        <br />
        <a onClick={() => navigate("/settings")}>Settings</a>
        <br />
        {userLoggedIn && (
          <>
            <a
              onClick={() => {
                // handle_logout
                // Set redux store to null
                dispatch(authUserSet(null));

                // Set local Storage to null
                localStorage.removeItem("logged_in");
                localStorage.removeItem("access_token");

                // Navigate to landing-page
                navigate("/landing-page");
              }}
            >
              Signout
            </a>
            <br />
          </>
        )}
      </>
    );
  };

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
        <div
          id={styles.mobile_menu}
          data-tip
          data-for="mobile_menu"
          data-event="click"
        >
          <IoMenuSharp size={"2em"} />
        </div>
        <ReactTooltip
          place="top"
          id="mobile_menu"
          {...toolTipProps}
          className={styles.tooltip_modal}
        >
          <ProfileToolTip />
        </ReactTooltip>
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

          <div
            className={`${styles.profile_nav} ${styles.hide_for_mobile}`}
            data-tip
            data-for="pc_menu"
            data-event="click"
            place="right"
          >
            {/* <Link to={"/profile"}> */}
            <img
              src={
                userLoggedIn
                  ? userLoggedIn.avatar
                  : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              }
            />
            {/* </Link> */}
          </div>
          <ReactTooltip
            place="right"
            id="pc_menu"
            {...toolTipProps}
            className={`${styles.tooltip_modal} `}
          >
            <ProfileToolTip />
            <br />
          </ReactTooltip>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
