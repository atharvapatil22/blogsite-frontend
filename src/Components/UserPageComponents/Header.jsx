import React from "react";
import styles from "./UserPage.module.css";
import ReactTooltip from "react-tooltip";
import { BsThreeDots } from "react-icons/bs";
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

  return (
    <>
      <ToastContainer />
      <header className={styles.header}>
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
              <a href="#">Mute this author</a>
              <br />
              <a href="#">Block this author</a>
              <br />
              <a href="#">Report this author</a>
            </ReactTooltip>
          </>
        )}
      </header>
    </>
  );
}

export default Header;
