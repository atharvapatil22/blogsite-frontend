import React from "react";
import styles from "./UserPage.module.css";
import ReactTooltip from "react-tooltip";
import { BsThreeDots } from "react-icons/bs";
import { RiMailAddLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

function Header({ userData, userLoggedIn, selfProfile }) {
  const toolTipProps = {
    place: "bottom",
    effect: "solid",
    type: "light",
    border: true,
    borderColor: "grey",
    arrowColor: "white",
    globalEventOff: "click",
    clickable: true,
    dataEvent: "click",
  };

  const handleFollow = () => {};

  return (
    <>
      <ToastContainer />
      <header className={styles.header}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingRight: "1em",
          }}
        >
          <h1>{userData.fullname}</h1>
          {!!userLoggedIn && (
            <>
              <BsThreeDots
                data-tip
                data-for="dots_icon"
                data-event="click"
                size={"1.5em"}
                id={styles.dots_icon}
              />

              <ReactTooltip
                {...toolTipProps}
                id="dots_icon"
                className={styles.tooltip_modal}
              >
                <a
                  href="#"
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    toast("Link Copied", {
                      position: "top-center",
                      theme: "dark",
                    });
                  }}
                >
                  Copy Link to Profile
                </a>
                <br />
                {selfProfile === true ? (
                  <a href="#">Design your Profile</a>
                ) : (
                  <>
                    <a href="#">Mute this author</a>
                    <br />
                    <a href="#">Block this author</a>
                    <br />
                    <a href="#">Report this author</a>
                  </>
                )}
              </ReactTooltip>
            </>
          )}
        </div>
        {!selfProfile && (
          <div className={styles.follow_container}>
            <button type="button" onClick={handleFollow}>
              Follow
            </button>
            <button
              data-tip
              data-for="mail"
              type="button"
              style={{ padding: "0.5em" }}
              onClick={() => alert("Feature is under development")}
            >
              <RiMailAddLine size={"1.2em"} />
            </button>
            <ReactTooltip place="bottom" effect="solid" id="mail">
              Subscribe to get an email whenever {userData.fullname} publishes
            </ReactTooltip>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
