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
import Header from "../../Components/UserPageComponents/Header";
import HomeSection from "../../Components/UserPageComponents/HomeSection";

function User() {
  const { userID } = useParams();
  const store = useSelector((state) => state);
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedTab, setSelectedTab] = useState("home");

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
    fetchData();
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

  const AboutSection = () => {
    const twitter = userData.social_links?.twitter;
    const facebook = userData.social_links?.facebook;
    const linkedin = userData.social_links?.linkedin;

    return (
      <div className={styles.about_section}>
        {!!userData.about && (
          <p
            style={{
              borderBottom: "1px solid lightgray",
              paddingBottom: "2em",
            }}
          >
            {userData.about}
          </p>
        )}
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

  if (dataLoading) return <PageLoader />;

  return (
    <div className={styles.user_container}>
      <div className={styles.user_body}>
        <div className={styles.responsive_width}>
          <Header
            userData={userData}
            userLoggedIn={userLoggedIn}
            selfProfile={false}
          />
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
              <HomeSection userID={userID} />
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
