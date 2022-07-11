import React from "react";
import styles from "./ToolBar.module.css";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { BsThreeDots } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function ToolBar({ showPreview }) {
  const store = useSelector((state) => state);
  const currentUser = store.globalData.authUser;

  const toolTipProps = {
    place: "bottom",
    effect: "solid",
    type: "light",
    border: true,
    borderColor: "grey",
    arrowColor: "white",
    globalEventOff: "click",
    clickable: true,
  };

  const OtherOptions = () => {
    return (
      <>
        {[
          "Share draft link",
          "Share to Twitter",
          "Change Featured Image",
          "Change display title / subtitle",
          "Change tags",
          "More Settings",
        ].map((item, index) => (
          <div key={index}>
            <a href="#">{item}</a>
            <br />
          </div>
        ))}
        <hr />
        {["Hints", "More Help"].map((item, index) => (
          <div key={index}>
            <a href="#">{item}</a>
            <br />
          </div>
        ))}
      </>
    );
  };

  const ProfileOptions = () => {
    return (
      <>
        banner
        <hr />
        {[
          "Write a story",
          "Stories",
          "Stats",
          "Design Your Profile",
          "Settings",
        ].map((item, index) => (
          <div key={index}>
            <a href="#">{item}</a>
            <br />
          </div>
        ))}
        <hr />
        {["Lists", "Publications"].map((item, index) => (
          <div key={index}>
            <a href="#">{item}</a>
            <br />
          </div>
        ))}
        <hr />
        {["Help", "Sign Out"].map((item, index) => (
          <div key={index}>
            <a href="#">{item}</a>
            <br />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.toolbar_container}>
      <div className={styles.section_1}>
        <Link to={"/home"}>
          <div className={styles.toolbar_home_link}>
            <img
              className={styles.toolbar_logo}
              src={require("../../assets/cogito_logo.png")}
              alt=""
            />
          </div>
        </Link>
        <p>Draft in {!!currentUser ? currentUser.fullname : "null"} </p>
        <p style={{ color: "grey" }}>Saved</p>
      </div>
      <div className={styles.section_2}>
        <button
          onClick={showPreview}
          className={styles.publish_btn}
          type="button"
        >
          Publish
        </button>
        <button
          className={`${styles.tool_btn} ${styles.hide_for_mobile}`}
          data-tip
          data-for="optionsTip"
          data-event="click"
        >
          <BsThreeDots size="1.6em" />
        </button>
        <button
          className={`${styles.tool_btn} ${styles.hide_for_mobile}`}
          data-tip
          data-for="notificationsTip"
          data-event="click"
        >
          <IoNotificationsOutline size="1.8em" />
        </button>
        <button
          className={`${styles.tool_btn} ${styles.hide_for_mobile}`}
          data-tip
          data-for="profileTip"
          data-event="click"
        >
          {!!currentUser ? (
            <img
              className={styles.toolbar_profile_pic}
              src={currentUser.avatar}
              alt=""
            />
          ) : (
            "P"
          )}
        </button>
        <ReactTooltip
          id="optionsTip"
          {...toolTipProps}
          className={styles.tooltip_modal}
        >
          <OtherOptions />
        </ReactTooltip>
        <ReactTooltip
          id="notificationsTip"
          {...toolTipProps}
          className={styles.tooltip_modal}
        >
          <p>New notifications will show here</p>
        </ReactTooltip>
        <ReactTooltip
          id="profileTip"
          {...toolTipProps}
          className={styles.tooltip_modal}
        >
          <ProfileOptions />
        </ReactTooltip>
      </div>
    </div>
  );
}

export default ToolBar;
