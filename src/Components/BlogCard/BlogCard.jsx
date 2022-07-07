import React from "react";
import styles from "./BlogCard.module.css";
import { useNavigate } from "react-router-dom";
import PublishingDate from "../PublishingDate";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  return (
    <div
      className={styles.blog_card}
      onClick={() => navigate(`/blog/${blog.id}`)}
    >
      <div className={styles.card_header}>
        <img src={blog.author_avatar} className={styles.author_avatar} alt="" />
        <p style={{ margin: "0 0.5em" }}>{blog.author_fullname}</p>
        {"."}&nbsp;
        <p style={{ color: "grey", margin: "0.5em" }}>
          <PublishingDate dateString={blog.blog_date} />
        </p>
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
          <p className={styles.card_topic}>Topic</p>
          <p style={{ color: "grey", margin: "0 0 0 0.5em" }}>
            {blog.length_in_time} min read
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button className={styles.card_btns} type="button">
            <MdOutlineBookmarkAdd size={"1.5em"} />
          </button>
          <button className={styles.card_btns} type="button">
            <AiOutlineMinusCircle size={"1.5em"} />
          </button>
          <button className={styles.card_btns} type="button">
            <BsThreeDots size={"1.5em"} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
