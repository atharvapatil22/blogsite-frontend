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
import ImpressionsModal from "../../Components/ImpressionsModal/ImpressionsModal";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";

function Profile() {
  const store = useSelector((state) => state);
  const currentUser_ID = store.globalData.authUser.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState("home");

  const [dataLoading, setDataLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [hasFollowing, setHasFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  const [aboutText, setAboutText] = useState("");
  const [disableSaveBtn, setDisableSaveBtn] = useState(true);
  const [disableInput, setDisableInput] = useState(false);

  const [socialLinks, setSocialLinks] = useState({});
  const [hasSocialLinks, setHasSocialLinks] = useState(false);
  const [showLinksEditor, setShowLinksEditor] = useState(false);
  const [disableLinksEditor, setDisableLinksEditor] = useState(false);

  const [impressionsModal, setImpressionsModal] = useState(false);
  const [impressionsType, setImpressionsType] = useState("followers");

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
    fetchData();
    fetchBlogs();
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
          if (res.data.user.following.length > 0) {
            setHasFollowing(true);
            fetchFollowing(res.data.user.following);
          }
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

  const fetchBlogs = () => {
    setBlogsLoading(true);

    axios
      .get(BaseURL + `/users/${currentUser_ID}/all-blogs`)
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

  const fetchFollowing = (array_of_following) => {
    axios
      .post(BaseURL + "/blogs/get-likes", {
        array_of_likers: array_of_following,
      })
      .then((res) => {
        console.log("Following List", res.data.likers);
        setFollowingList(res.data.likers);
      })
      .catch((err) => console.log("Error", err));
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

  const SidebarContent = () => {
    return (
      <div className={styles.sidebar_content}>
        <div className={styles.part_1}>
          <img src={userData.avatar} alt="" />
          <h2>{userData.fullname}</h2>
          <p>
            {!!userData.followers ? userData.followers.length : 0} Followers
          </p>
        </div>
        <div className={styles.part_2}>
          <div className={styles.part_2}>
            {hasFollowing && (
              <>
                <h4>Following</h4>
                {followingList.length === 0 ? (
                  <SpinnerLoader color={"black"} />
                ) : (
                  <div>
                    {followingList.slice(0, 5).map((item, index) => {
                      return (
                        <div key={index} className={styles.following_user}>
                          <img src={item.avatar} alt="" />
                          <p>{item.fullname}</p>
                        </div>
                      );
                    })}
                    {followingList.length > 5 && (
                      <p className={styles.show_all_following}>
                        Show all {followingList.length}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (dataLoading) return <PageLoader />;

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_body}>
        <div className={styles.responsive_width}>
          {!!impressionsModal && (
            <ImpressionsModal
              show={!!impressionsModal}
              type={impressionsType}
              onClose={() => {
                setImpressionsModal(false);
              }}
              arrayOfUserIDs={
                impressionsType == "followers"
                  ? userData.followers
                  : userData.following
              }
            />
          )}
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
              <HomeSection
                userID={currentUser_ID}
                userBlogs={userBlogs}
                blogsLoading={blogsLoading}
              />
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
                      onClick={() => {
                        setImpressionsType("followers");
                        setImpressionsModal(true);
                      }}
                    >
                      {userData.followers.length} Followers
                    </button>
                    <button
                      type="button"
                      className={styles.follower_btn}
                      onClick={() => {
                        setImpressionsType("following");
                        setImpressionsModal(true);
                      }}
                    >
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
      </div>
      <Sidebar content={<SidebarContent />} />
    </div>
  );
}

export default Profile;
