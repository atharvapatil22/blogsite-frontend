import React from "react";
import "./ToolBar.css";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { BsThreeDots, BsBell } from "react-icons/bs";

function ToolBar({ showPreview }) {
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
    <div className="toolbar-container">
      <div className="section-1">
        <Link to={"/home"}>
          <div className="home-link">
            <p>Blogomo</p>
          </div>
        </Link>
        <p>Draft in XYZ ABC </p>
        <p> Sav(ed/ing)</p>
      </div>
      <div className="section-2">
        <button onClick={showPreview} className="publish-btn" type="button">
          Publish
        </button>
        <button
          className="tool-btn"
          data-tip
          data-for="optionsTip"
          data-event="click"
        >
          <BsThreeDots size="1.4em" />
        </button>
        <button
          className="tool-btn"
          data-tip
          data-for="notificationsTip"
          data-event="click"
        >
          <BsBell size="1.4em" />
        </button>
        <button
          className="tool-btn"
          data-tip
          data-for="profileTip"
          data-event="click"
        >
          P
        </button>
        <ReactTooltip
          id="optionsTip"
          {...toolTipProps}
          className="tooltip-modal"
        >
          <OtherOptions />
        </ReactTooltip>
        <ReactTooltip
          id="notificationsTip"
          {...toolTipProps}
          className="tooltip-modal"
        >
          Tooltip for the notifications
        </ReactTooltip>
        <ReactTooltip
          id="profileTip"
          {...toolTipProps}
          className="tooltip-modal"
        >
          <ProfileOptions />
        </ReactTooltip>
      </div>
    </div>
  );
}

export default ToolBar;
