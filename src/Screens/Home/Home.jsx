import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import PageLoader from "../../Components/PageLoader/PageLoader";
import BlogCard from "../../Components/BlogCard/BlogCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";

function Home() {
  const [blogsList, setBlogsList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const [followingData, setFollowingData] = useState([]);

  const store = useSelector((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchFollowers();
  }, []);

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

  // HARD CODED FOR NOW
  const popularUsers = [
    {
      id: 87,
      fullname: "Atharva Patil",
      avatar:
        "https://res.cloudinary.com/dbanpvg0t/image/upload/v1658231089/usiip8oelocdjhkmsf3v.png",
    },
    {
      id: 89,
      fullname: "Jane Doe",
      avatar:
        "https://res.cloudinary.com/dbanpvg0t/image/upload/v1658231505/eibvpecfwy735nget012.png",
    },
    {
      id: 90,
      fullname: "Dinesh Singh",
      avatar:
        "https://res.cloudinary.com/dbanpvg0t/image/upload/v1658231722/theft6l9iqzzckc0tvnx.png",
    },
  ];

  const SidebarContent = () => {
    // Hard Coded for now
    let todaysRec = [1, 3, 4];

    return (
      <div className={styles.sidebar_content}>
        {!!blogsList && (
          <div className={styles.todays_rec}>
            <h3>Today's Recommendations</h3>

            {todaysRec.map((n, index) => {
              return (
                <div
                  key={index}
                  className={styles.blog_item}
                  onClick={() => {
                    if (!!blogsList[n]) navigate(`/blog/${blogsList[n].id}`);
                  }}
                >
                  {!!blogsList[n] && (
                    <div style={{ margin: "1em 0" }}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img src={blogsList[n].author_avatar} alt="" />
                        <p style={{ marginLeft: "2%" }}>
                          {blogsList[n].author_fullname}
                        </p>
                      </div>
                      <p style={{ marginTop: "0.3em", fontWeight: "600" }}>
                        {blogsList[n].title}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
            <p id={styles.rec_link}>See full list</p>
          </div>
        )}
        <hr />
        <div className={styles.topics_rec}>
          <h3>Recommended Topics</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1em",
            }}
          >
            <div className={styles.topic}></div>
            <div className={styles.topic}></div>
            <div className={styles.topic}></div>
          </div>
        </div>
        <hr />
        <div className={styles.follow_rec}>
          <h3>Who to Follow</h3>
          {!!popularUsers.length == 0 ? (
            <SpinnerLoader color={"black"} />
          ) : (
            <>
              {popularUsers.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={styles.popular_user}
                    onClick={() => navigate(`/user/${item.id}`)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "75%",
                      }}
                    >
                      <img src={item.avatar} alt="" />
                      <p>{item.fullname}</p>
                    </div>
                    <button disabled type="button">
                      Follow
                    </button>
                  </div>
                );
              })}
              <p>See more suggestions</p>
            </>
          )}
        </div>
      </div>
    );
  };

  const currentUser_ID = store.globalData.authUser?.id;

  if (showLoader) return <PageLoader />;

  return (
    <div className={styles.home_container}>
      <div className={styles.home_body}>
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
      </div>
      <Sidebar content={<SidebarContent />} />
    </div>
  );
}

export default Home;
