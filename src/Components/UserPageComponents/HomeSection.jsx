import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../environment";
import BlogCard from "../BlogCard/BlogCard";
import styles from "./UserPage.module.css";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function HomeSection({ userBlogs, blogsLoading }) {
  const store = useSelector((state) => state);

  const currentUser_ID = store.globalData.authUser?.id;
  if (blogsLoading) return <SpinnerLoader color={"black"} />;
  else if (!!userBlogs && userBlogs.length === 0)
    return (
      <div className={styles.home_blogs}>User has not written any blogs</div>
    );
  else if (!!userBlogs && userBlogs.length > 0)
    return (
      <div className={styles.home_blogs}>
        {userBlogs.map((blog) => (
          <div
            style={{
              width: "100%",
            }}
            key={blog.id}
          >
            <BlogCard blog={blog} currentUser_ID={currentUser_ID} />
            <hr
              style={{
                marginTop: "1em",
                marginBottom: "1em",
                borderColor: "#f0f0f0",
                borderWidth: "0.1px",
              }}
            />
          </div>
        ))}
      </div>
    );
}

export default HomeSection;
