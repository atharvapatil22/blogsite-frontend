import React from "react";
import "./WriteBlogTools.css";
import { Link } from "react-router-dom";

function WriteBlogTools() {
  const publishBlog = () => {
    window.confirm("Are you sure to publish blog?");
  };

  return (
    <div className="toolbar-container">
      <div className="section-1">
        <Link to={"/"}>
          <div className="home-link">
            <p>Blogomo</p>
          </div>
        </Link>
        <p>Draft in XYZ ABC </p>
        <p> Sav(ed/ing)</p>
      </div>
      <div className="section-2">
        <button onClick={publishBlog} type="button">
          Publish
        </button>
        <p>D</p>
        <p>N</p>
        <p>P</p>
      </div>
    </div>
  );
}

export default WriteBlogTools;
