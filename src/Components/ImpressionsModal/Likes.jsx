import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../environment";
import styles from "./ImpressionsModal.module.css";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function Likes({ blogLikes }) {
  const [likers, setLikers] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (blogLikes.length > 0) fetchData();
  }, []);

  const fetchData = () => {
    setShowLoader(true);
    axios
      .post(BaseURL + "/blogs/get-likes", { array_of_likers: blogLikes })
      .then((res) => {
        setLikers(res.data.likers);
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => setShowLoader(false));
  };

  if (blogLikes.length == 0) return <p>No Likes Yet</p>;

  return (
    <div>
      {showLoader ? (
        <SpinnerLoader color={"black"} />
      ) : (
        likers.map((user, index) => (
          <div className={styles.liker_row} key={index}>
            <img src={user.avatar} alt="" />
            <p>{user.fullname}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Likes;
