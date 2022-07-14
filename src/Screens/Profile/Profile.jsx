import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../Components/PageLoader/PageLoader";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/UserPageComponents/Header";
import HomeSection from "../../Components/UserPageComponents/HomeSection";
import { BaseURL } from "../../environment";
import { authUserSet } from "../../redux/actions";
import styles from "./Profile.module.css";
import { BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";

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

  const [socialLinks, setSocialLinks] = useState({});
  const [hasSocialLinks, setHasSocialLinks] = useState(false);
  const [showLinksEditor, setShowLinksEditor] = useState(false);
  const [disableLinksEditor, setDisableLinksEditor] = useState(false);

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
    fetchData();
  }, []);

  const checkSocialLinks = (links) => {
    if (links === null || links === undefined || links === {}) return false;
    else return true;
  };

  const fetchData = () => {
    setDataLoading(true);
    axios
      .get(BaseURL + `/users/${currentUser_ID}`)
      .then((res) => {
        setDataLoading(false);
        console.log("Data Response: ", res.data);
        if (res.data.message === "success") {
          const _links = res.data.user.social_links;
          setUserData(res.data.user);
          setAboutText(res.data.user.about);
          setSocialLinks(_links);
          setHasSocialLinks(checkSocialLinks(_links));
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

  const saveLinks = () => {
    setHasSocialLinks(checkSocialLinks(socialLinks));

    setDisableLinksEditor(true);
    axios
      .post(BaseURL + "/users/update", {
        field_name: "social_links",
        field_value: socialLinks,
        user_id: currentUser_ID,
      })
      .then((res) => {
        console.log("Response:", res);
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => {
        setDisableLinksEditor(false);
        setShowLinksEditor(false);
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

  const SocialLinks = () => {
    if (showLinksEditor)
      return (
        <div className={styles.social_links}>
          <div className={styles.editor}>
            <div className={styles.input_wrapper}>
              <BsTwitter />
              <input
                onChange={(e) => {
                  let temp = socialLinks ? socialLinks : {};
                  temp.twitter = e.target.value;
                  setSocialLinks(temp);
                }}
                disabled={disableLinksEditor}
                type="text"
                placeholder={
                  !!socialLinks?.twitter
                    ? socialLinks?.twitter
                    : "Link to your Twitter Profile"
                }
              />
            </div>
            <div className={styles.input_wrapper}>
              <BsFacebook />
              <input
                onChange={(e) => {
                  let temp = socialLinks;
                  temp.facebook = e.target.value;
                  setSocialLinks(temp);
                }}
                disabled={disableLinksEditor}
                type="text"
                placeholder={
                  !!socialLinks?.facebook
                    ? socialLinks?.facebook
                    : "Link to your Facebook Profile"
                }
              />
            </div>
            <div className={styles.input_wrapper}>
              <BsLinkedin />
              <input
                onChange={(e) => {
                  let temp = socialLinks;
                  temp.linkedin = e.target.value;
                  setSocialLinks(temp);
                }}
                disabled={disableLinksEditor}
                type="text"
                placeholder={
                  !!socialLinks?.linkedin
                    ? socialLinks?.linkedin
                    : "Link to your LinkedIn Profile"
                }
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className={styles.cancel_btn}
                onClick={() => setShowLinksEditor(false)}
              >
                Cancel
              </button>
              <button
                disabled={disableLinksEditor}
                type="button"
                className={`${styles.save_btn} ${
                  disableLinksEditor ? styles.disabled : ""
                }`}
                onClick={saveLinks}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className={styles.social_links}>
          {hasSocialLinks ? (
            <div className={styles.your_links}>
              <p style={{ marginRight: "1%" }}>Your Social Links</p>
              {!!socialLinks?.twitter && (
                <button
                  className={styles.link_icon}
                  onClick={() => window.open(socialLinks.twitter, "_blank")}
                >
                  <BsTwitter />
                </button>
              )}
              {!!socialLinks?.facebook && (
                <button
                  className={styles.link_icon}
                  onClick={() => window.open(socialLinks.facebook, "_blank")}
                >
                  <BsFacebook />
                </button>
              )}
              {!!socialLinks?.linkedin && (
                <button
                  className={styles.link_icon}
                  onClick={() => window.open(socialLinks.linkedin, "_blank")}
                >
                  <BsLinkedin />
                </button>
              )}
              <button
                type="button"
                style={{
                  paddingTop: "0.3em",
                  paddingBottom: "0.3em",
                  marginLeft: "2%",
                }}
                className={styles.add_links_btn}
                onClick={() => setShowLinksEditor(true)}
              >
                Edit Links
              </button>
            </div>
          ) : (
            <>
              <button
                className={styles.add_links_btn}
                onClick={() => setShowLinksEditor(true)}
              >
                + Add Social Media Links
              </button>
            </>
          )}
        </div>
      );
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
                    <button
                      className={styles.follower_btn}
                      type="button"
                      style={{ paddingLeft: "0" }}
                    >
                      {userData.followers.length} Followers
                    </button>
                    <button type="button" className={styles.follower_btn}>
                      {userData.following.length} Following
                    </button>
                  </div>
                  <SocialLinks />
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
