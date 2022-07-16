import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BaseURL } from "../../environment";
import PublishingDate from "../PublishingDate";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import styles from "./ImpressionsModal.module.css";
import { RiThumbUpLine } from "react-icons/ri";

function Comments({ blogId, blogComments, incrementCount }) {
  const store = useSelector((state) => state);
  const userLoggedIn = store.globalData.authUser;

  const [newComment, setNewComment] = useState("");
  const [disableAddBtn, setDisableAddBtn] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (blogComments > 0) fetchData();
  }, []);

  const fetchData = () => {
    setShowLoader(true);
    axios
      .get(BaseURL + `/comments/${blogId}`)
      .then((res) => {
        console.log("Res", res.data.comments);
        setCommentsList(res.data.comments);
        setShowLoader(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setShowLoader(false);
      });
  };

  const addNewComment = () => {
    setDisableAddBtn(true);

    axios
      .post(BaseURL + "/comments", {
        text: newComment,
        blog_id: blogId,
        user_id: userLoggedIn.id,
      })
      .then((res) => {
        setNewComment("");
        incrementCount();
        setDisableAddBtn(false);
        fetchData();
      })
      .catch((err) => {
        console.log("Error:", err);
        setDisableAddBtn(false);
      });
  };

  return (
    <>
      {!!userLoggedIn ? (
        <div className={styles.new_comment}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "2em",
            }}
          >
            <img src={userLoggedIn.avatar} alt="" />
            <p style={{ marginLeft: "0.5em" }}>{userLoggedIn.fullname}</p>
          </div>
          <textarea
            placeholder={"What are your thoughts?"}
            maxLength={250}
            name="new_comment"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            value={newComment}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" onClick={() => setNewComment("")}>
              Clear
            </button>
            <button
              type="button"
              className={`${styles.add_btn} ${
                disableAddBtn ? styles.disabled : ""
              }`}
              onClick={addNewComment}
              disabled={disableAddBtn}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Login to add a comment</p>
        </div>
      )}

      {/* Comments List */}
      <div className={styles.comments_list}>
        {showLoader ? (
          <SpinnerLoader color="black" />
        ) : blogComments === 0 ? (
          <p>No Comments Yet</p>
        ) : (
          <div
            style={{
              margin: "0 2em 0 1em",
            }}
          >
            {commentsList.map((item, index) => (
              <div key={index} className={styles.comment_block}>
                <div className={styles.header}>
                  <img src={item.user_avatar} alt="" />
                  <div style={{ marginLeft: "1em", textAlign: "left" }}>
                    <p>{item.user_fullname}</p>
                    <div style={{ color: "grey" }}>
                      <PublishingDate dateString={item.comment_date} />
                    </div>
                  </div>
                </div>
                <p className={styles.main}>{item.text}</p>
                <div className={styles.footer}>
                  <div
                    style={{
                      fontSize: "1.2em",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <RiThumbUpLine />
                    &nbsp; 0
                  </div>
                  <p>Reply</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Comments;
