import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import PageLoader from "../../Components/PageLoader/PageLoader";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blogsList, setBlogsList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [followingData, setFollowingData] = useState([]);

  const store = useSelector((state) => state);
  const navigate = useNavigate();

  const fetchData = () => {
    setShowLoader(true);
    axios
      .post(BaseURL + "/blogs/get-list")
      .then((res) => {
        if (res.status == 200) setBlogsList(res.data);
        console.log("Response: ", res);
      })
      .catch((err) => console.log("Error: ", err))
      .finally(() => {
        setShowLoader(false);
      });
  };

  const fetchFollowers = () => {
    const currentUser = store.globalData.authUser;
    if (currentUser != null) {
      if (currentUser.following.length > 0)
        axios
          .post(BaseURL + "/blogs/get-likes", {
            array_of_likers: currentUser.following,
          })
          .then((res) => {
            console.log("Followers", res.data);
            setFollowingData(res.data.likers);
          })
          .catch((err) => console.log("err", err.response));
    }
  };

  useEffect(() => {
    fetchData();
    fetchFollowers();
  }, []);

  const currentUser_ID = store.globalData.authUser?.id;

  return (
    <div className={styles.home_container}>
      <div className={styles.home_body}>
        {!!showLoader ? (
          <PageLoader />
        ) : (
          <div className={styles.responsive_width}>
            {!!followingData.length > 0 ? (
              <div
                style={{
                  // margin: "1.5em 0",
                  padding: "0 2%",
                  borderBottom: "1px solid lightgray",
                }}
              >
                <h2 style={{ textAlign: "left", fontFamily: "var(--font-1)" }}>
                  People you Follow:
                </h2>
                <div className={styles.following}>
                  {followingData.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (item.id === currentUser_ID) navigate("/profile");
                        else navigate(`/user/${item.id}`);
                      }}
                    >
                      <img src={item.avatar}></img>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h2 id={styles.home_heading}>Home</h2>
            )}

            <div className={styles.blog_list}>
              {blogsList.map((blog) => (
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
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
