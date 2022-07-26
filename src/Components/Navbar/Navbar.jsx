import React from "react";
import styles from "./Navbar.module.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMenuSharp } from "react-icons/io5";
import ReactTooltip from "react-tooltip";
import { authUserSet } from "../../redux/actions";
import { FiEdit } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { IoBookmarksOutline } from "react-icons/io5";

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
                <Link to={"/home"} data-tip data-for="home_link">
                  <div className={styles.navbar_link}>
                    <AiOutlineHome fontSize={"2em"} />
                  </div>
                </Link>
              </li>
              <li className={` ${styles.hide_for_mobile}`}>
                <a href="#" data-tip data-for="list_link">
                  <div className={styles.navbar_link}>
                    <IoBookmarksOutline fontSize={"1.7em"} />
                  </div>
                </a>
              </li>
              <li>
                <Link to={"/write-blog"} data-tip data-for="write_link">
                  <div className={styles.navbar_link}>
                    <FiEdit fontSize={"1.8em"} />
                  </div>
                </Link>
              </li>
              <li className={` ${styles.hide_for_mobile}`}> </li>
              <li className={` ${styles.hide_for_mobile}`}> </li>
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
            <div className={` ${styles.hide_for_mobile}`}>
              <ReactTooltip place="right" effect="solid" id="home_link">
                <p style={{ margin: 0, fontSize: "1.2em" }}>Home</p>
              </ReactTooltip>
              <ReactTooltip place="right" effect="solid" id="list_link">
                <p style={{ margin: 0, fontSize: "1.2em" }}>Lists</p>
              </ReactTooltip>
              <ReactTooltip place="right" effect="solid" id="write_link">
                <p style={{ margin: 0, fontSize: "1.2em" }}>Write Blogs</p>
              </ReactTooltip>
            </div>
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
