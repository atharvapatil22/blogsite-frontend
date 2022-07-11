import React from "react";
import { useSelector } from "react-redux";
import styles from "./ImpressionsModal.module.css";

function Comments() {
  const store = useSelector((state) => state);
  const userLoggedIn = store.globalData.authUser;
  return (
    <>
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
          onChange={() => {}}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="button">Clear</button>
          <button type="button" className={styles.add_btn}>
            Add
          </button>
        </div>
      </div>
      <h2>comments List</h2>
      <div
        style={{
          backgroundColor: "green",
          height: "600px",
          margin: "0 2em 0 1em",
        }}
      ></div>
    </>
  );
}

export default Comments;
