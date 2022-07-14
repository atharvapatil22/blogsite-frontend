import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../Components/PageLoader/PageLoader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";
import Header from "../../Components/UserPageComponents/Header";
import HomeSection from "../../Components/UserPageComponents/HomeSection";
import { BaseURL } from "../../environment";
import { authUserSet } from "../../redux/actions";
import styles from "./Profile.module.css";

function Profile() {
  const store = useSelector((state) => state);
  const currentUser_ID = store.globalData.authUser.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [selectedTab, setSelectedTab] = useState("home");
  const [aboutText, setAboutText] = useState("");
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [disableInput, setDisableInput] = useState(false);

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
    fetchData();
  }, []);

  const fetchData = () => {
    setDataLoading(true);
    axios
      .get(BaseURL + `/users/${currentUser_ID}`)
      .then((res) => {
        setDataLoading(false);
        console.log("Data Response: ", res.data);
        if (res.data.message === "success") {
          setUserData(res.data.user);
          setAboutText(res.data.user.about);
        }
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

  const saveAboutText = () => {
    setDisableSaveBtn(true);
    setDisableInput(true);
    axios
      .post(BaseURL + "/users/update", {
        field_name: "about",
        field_value: aboutText,
        user_id: currentUser_ID,
      })
      .then((res) => {
        console.log("Response:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => {
        setDisableSaveBtn(false);
        setDisableInput(false);
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
              <HomeSection userID={currentUser_ID} />
            ) : selectedTab === "about" ? (
              <div className={styles.about_section}>
                <textarea
                  disabled={disableInput}
                  placeholder="Write something about yourself"
                  value={aboutText}
                  onChange={(e) => {
                    if (disableSaveBtn) setDisableSaveBtn(false);
                    setAboutText(e.target.value);
                  }}
                />
                <div
                  style={{
                    marginTop: "1em",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className={`${styles.save_btn} ${
                      disableSaveBtn ? styles.disabled : ""
                    }`}
                    type="button"
                    disabled={disableSaveBtn}
                    onClick={saveAboutText}
                  >
                    Save
                  </button>
                </div>

                <div className={styles.about_footer}>
                  <div style={{ display: "flex", marginTop: "2em" }}>
                    <button type="button" style={{ paddingLeft: "0" }}>
                      {userData.followers.length} Followers
                    </button>
                    <button type="button">
                      {userData.following.length} Following
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              "null"
            )}
          </div>
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
