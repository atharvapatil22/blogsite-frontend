import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL } from "../../environment";
import styles from "./ImpressionsModal.module.css";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function Likes({ arrayOfUserIDs, type }) {
  const [arrayOfUserDetails, setArrayOfUserDetails] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (arrayOfUserIDs.length > 0) fetchData();
  }, []);

  const fetchData = () => {
    setShowLoader(true);
    axios
      .post(BaseURL + "/blogs/get-likes", { array_of_likers: arrayOfUserIDs })
      .then((res) => {
        setArrayOfUserDetails(res.data.likers);
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => setShowLoader(false));
  };

  if (arrayOfUserIDs.length == 0) return <p>No {type} Yet</p>;

  return (
    <div>
      {showLoader ? (
        <SpinnerLoader color={"black"} />
      ) : (
        arrayOfUserDetails.map((user, index) => (
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
