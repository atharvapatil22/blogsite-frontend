import React from "react";
import styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";
import PublishingDate from "../PublishingDate";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

function BlogCard({ blog, currentUser_ID }) {
  const navigate = useNavigate();

  const goToAuthorProfile = (e) => {
    e.stopPropagation();
    if (blog.author_id === currentUser_ID) navigate("/profile");
    else navigate(`/user/${blog.author_id}`);
  };

  const MoreOptions = () => {
    return (
      <>
        {blog.author_id == currentUser_ID ? (
          <>
            {["Edit this article", "Email to subscribers"].map(
              (item, index) => (
                <div key={index}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {item}
                  </a>
                  <br />
                </div>
              )
            )}
            <hr />
            {["Story Settings", "Story Stats"].map((item, index) => (
              <div key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {item}
                </a>
                <br />
              </div>
            ))}
            <hr />
            {["Hide Responses", "Delete Story"].map((item, index) => (
              <div key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {item}
                </a>
                <br />
              </div>
            ))}
          </>
        ) : (
          <>
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              href="#"
            >
              Mute this author
            </a>
            <br />
            <a
              onClick={(e) => {
                e.stopPropagation();
              }}
              href="#"
            >
              Report
            </a>
          </>
        )}
      </>
    );
  };

  return (
    <div
      className={styles.blog_card}
      onClick={() => navigate(`/blog/${blog.id}`)}
    >
      <div className={styles.card_header}>
        <img
          src={blog.author_avatar}
          className={styles.author_avatar}
          alt=""
          onClick={goToAuthorProfile}
        />
        <p style={{ margin: "0 0.5em" }} onClick={goToAuthorProfile}>
          {blog.author_fullname}
        </p>
        {"∙"}
        <div style={{ color: "grey", margin: "0.5em" }}>
          <PublishingDate dateString={blog.blog_date} />
        </div>
      </div>
      <div className={styles.card_main}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "calc(100% - 1em - 110px)",
          }}
        >
          <p className={styles.blog_title}>{blog.title}</p>
          <p className={styles.blog_content_preview}>{blog.first_block}</p>
        </div>
        <img src={blog.image} alt="" />
      </div>
      <div className={styles.card_footer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={styles.card_topic}
          >
            Topic
          </p>
          <p style={{ color: "grey", margin: "0 0 0 0.5em" }}>
            {blog.length_in_time} min read
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            data-tip
            data-for="save_btn"
            className={styles.card_btns}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              alert("Feature is under development");
            }}
          >
            <MdOutlineBookmarkAdd size={"1.5em"} />
          </button>
          <button
            data-tip
            data-for="mute_btn"
            className={styles.card_btns}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AiOutlineMinusCircle size={"1.5em"} />
          </button>
          <button
            data-tip
            data-for="more_btn"
            data-event="click"
            className={styles.card_btns}
            type="button"
          >
            <BsThreeDots size={"1.5em"} />
          </button>
          <ReactTooltip place="top" effect="solid" id="save_btn">
            Save
          </ReactTooltip>
          <ReactTooltip place="top" effect="solid" id="mute_btn">
            Show less like this
          </ReactTooltip>
          <ReactTooltip
            id="more_btn"
            effect="solid"
            place="bottom"
            type="light"
            border={true}
            borderColor="grey"
            arrowColor="white"
            globalEventOff="click"
            clickable={true}
            dataEvent="click"
            className={styles.tooltip_modal}
          >
            <MoreOptions />
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
