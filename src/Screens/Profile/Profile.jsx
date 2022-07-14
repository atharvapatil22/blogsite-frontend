import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../Components/PageLoader/PageLoader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/UserPageComponents/Header";
import { BaseURL } from "../../environment";
import { authUserSet } from "../../redux/actions";
import styles from "./Profile.module.css";

function Profile() {
  const store = useSelector((state) => state);
  const userID = store.globalData.authUser.id;
  const dispatch = useDispatch();
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

  const handleLogout = () => {
    // Set redux store to null
    dispatch(authUserSet(null));

    // Set local Storage to null
    localStorage.removeItem("logged_in");
    localStorage.removeItem("access_token");

    // Navigate to landing-page
    navigate("/landing-page");
  };

  if (dataLoading) return <PageLoader />;

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_body}>
        <div className={styles.responsive_width}>
          <Header
            userData={userData}
            userLoggedIn={userLoggedIn}
            selfProfile={true}
          />{" "}
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
          {/* <div className={styles.selected_tab}>
            {selectedTab == "home" ? (
              <HomeSection />
            ) : selectedTab === "about" ? (
              <AboutSection />
            ) : (
              "null"
            )}
          </div> */}
        </div>
        {!!userLoggedIn && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Profile;
