import React, { useEffect } from "react";
import styles from "./User.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../environment";
import { useState } from "react";
import PageLoader from "../../Components/PageLoader/PageLoader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import BlogCard from "../../Components/BlogCard/BlogCard";
import Header from "../../Components/UserPageComponents/Header";

function User() {
  const { userID } = useParams();
  const store = useSelector((state) => state);
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [selectedTab, setSelectedTab] = useState("home");

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
    fetchData();
    fetchBlogs();
  }, []);

  const fetchData = () => {
    setDataLoading(true);
    axios
      .get(BaseURL + `/users/${userID}`)
      .then((res) => {
        setDataLoading(false);
        console.log("Data Response: ", res.data);
        if (res.data.message === "success") setUserData(res.data.user);
      })
      .catch((err) => {
        setDataLoading(false);
        if (err?.response?.data) {
          console.log("Error in GET users/:id API", err.response.data);
          alert(err.response.data.message);
          navigate(-1);
        } else console.log("Error in GET users/:id API", err);
      });
  };

  const fetchBlogs = () => {
    setBlogsLoading(true);

    axios
      .get(BaseURL + `/users/${userID}/all-blogs`)
      .then((res) => {
        setBlogsLoading(false);
        console.log("Blogs Response: ", res.data);
        setUserBlogs(res.data);
      })
      .catch((err) => {
        setBlogsLoading(false);
        if (err?.response?.data) {
          console.log(
            "Error in GET users/:id/all-blogs API",
            err.response.data
          );
          alert(err.response.data.message);
          navigate(-1);
        } else console.log("Error in GET users/:id/all-blogs API", err);
      });
  };

  const HomeSection = () => {
    if (!!userBlogs && userBlogs.length === 0)
      return <div className={styles.home_blogs}>No blogs</div>;
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
    // Show loader
    else return <></>;
  };

  const AboutSection = () => {
    const twitter = userData.social_links?.twitter;
    const facebook = userData.social_links?.facebook;
    const linkedin = userData.social_links?.linkedin;

    return (
      <div className={styles.about_section}>
        <p>{userData.about}</p>
        <div className={styles.about_footer}>
          <div style={{ display: "flex", marginTop: "2em" }}>
            <button type="button" style={{ paddingLeft: "0" }}>
              {userData.followers.length} Followers
            </button>
            <button type="button">{userData.following.length} Following</button>
          </div>
          <div className={styles.social_links}>
            {(twitter || facebook || linkedin) && (
              <>Connect with {userData.fullname}</>
            )}
            <div style={{ display: "flex", marginLeft: "3%" }}>
              {!!twitter && (
                <button
                  onClick={() => {
                    window.open(twitter, "_blank");
                  }}
                >
                  <BsTwitter />
                </button>
              )}
              {!!facebook && (
                <button
                  onClick={() => {
                    window.open(facebook, "_blank");
                  }}
                >
                  <BsFacebook />
                </button>
              )}
              {!!linkedin && (
                <button
                  onClick={() => {
                    window.open(linkedin, "_blank");
                  }}
                >
                  <BsLinkedin />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentUser_ID = store.globalData.authUser?.id;

  if (dataLoading) return <PageLoader />;

  return (
    <div className={styles.user_container}>
      <div className={styles.user_body}>
        <div className={styles.responsive_width}>
          <Header userData={userData} userLoggedIn={userLoggedIn} />
          <div className={styles.tab_menu}>
            <p
              className={selectedTab === "home" ? styles.selected : ""}
              onClick={() => setSelectedTab("home")}
            >
              Home
            </p>
            <p
              className={selectedTab === "about" ? styles.selected : ""}
              style={{ marginLeft: "2em" }}
              onClick={() => setSelectedTab("about")}
            >
              About
            </p>
          </div>
          <div className={styles.selected_tab}>
            {selectedTab == "home" ? (
              <HomeSection />
            ) : selectedTab === "about" ? (
              <AboutSection />
            ) : (
              "null"
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default User;
