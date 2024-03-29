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
import { RiMailAddLine } from "react-icons/ri";
import ReactTooltip from "react-tooltip";
import AuthForm from "../../Components/AuthForm/AuthForm";
import ImpressionsModal from "../../Components/ImpressionsModal/ImpressionsModal";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";

function User() {
  const { userID } = useParams();
  const store = useSelector((state) => state);
  const navigate = useNavigate();

  const [currentUserID, setCurrentUserID] = useState(null);
  const [selectedTab, setSelectedTab] = useState("home");

  const [dataLoading, setDataLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const [blogsLoading, setBlogsLoading] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);

  const [hasFollowing, setHasFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);
  const [disableFollowBtn, setDisableFollowBtn] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [authFormVisible, setAuthFormVisible] = useState(false);

  const [impressionsModal, setImpressionsModal] = useState(false);
  const [impressionsType, setImpressionsType] = useState("followers");

  useEffect(() => {
    if (store.globalData.authUser != null)
      setCurrentUserID(store.globalData.authUser.id);
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
        if (res.data.message === "success") {
          setUserData(res.data.user);
          setFollowersCount(res.data.user.followers.length);
          if (res.data.user.followers.includes(store.globalData?.authUser?.id))
            setIsFollowing(true);

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

  const handleFollow = () => {
    if (currentUserID == null) {
      setAuthFormVisible(true);
      return;
    }
    setDisableFollowBtn(true);
    axios
      .post(BaseURL + "/users/follow", {
        source_user: currentUserID,
        target_user: userData.id,
        type: isFollowing ? "unfollow" : "follow",
      })
      .then((res) => {
        setFollowersCount(
          isFollowing ? followersCount - 1 : followersCount + 1
        );
        setIsFollowing(!isFollowing);
        console.log("res:", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setDisableFollowBtn(false);
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
            <button
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
              onClick={() => {
                setImpressionsType("following");
                setImpressionsModal(true);
              }}
            >
              {userData.following.length} Following
            </button>
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

  const SidebarContent = () => {
    return (
      <div className={styles.sidebar_content}>
        <div className={styles.part_1}>
          <img src={userData.avatar} alt="" />
          <h2>{userData.fullname}</h2>
          <p>{followersCount} Followers</p>
          {currentUserID != userData.id && (
            <div className={styles.follow_container}>
              <button
                disabled={disableFollowBtn}
                type="button"
                onClick={handleFollow}
                id={isFollowing ? styles.following_btn : ""}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
              <button
                data-tip
                data-for="mail"
                type="button"
                style={{ padding: "0.5em", marginLeft: "5%" }}
                onClick={() => alert("Feature is under development")}
              >
                <RiMailAddLine size={"1.2em"} />
              </button>
              <ReactTooltip place="bottom" effect="solid" id="mail">
                Subscribe to get an email whenever {userData.fullname} publishes
              </ReactTooltip>
            </div>
          )}
        </div>
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
    );
  };

  if (dataLoading) return <PageLoader />;

  return (
    <div className={styles.user_container}>
      <div className={styles.user_body}>
        <>
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
          <div className={styles.responsive_width}>
            {!!authFormVisible && (
              <AuthForm
                type={"login"}
                message={"Login to Follow users"}
                hideForm={() => {
                  setAuthFormVisible(false);
                }}
                dontSendBack
              />
            )}
            <Header
              userData={userData}
              userLoggedIn={currentUserID != null}
              selfProfile={false}
            />
            {currentUserID != userData.id && (
              <div
                className={`${styles.follow_container} ${styles.hide_for_sidebar}`}
              >
                <button
                  disabled={disableFollowBtn}
                  type="button"
                  onClick={handleFollow}
                  id={isFollowing ? styles.following_btn : ""}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  data-tip
                  data-for="mail"
                  type="button"
                  style={{ padding: "0.5em" }}
                  onClick={() => alert("Feature is under development")}
                >
                  <RiMailAddLine size={"1.2em"} />
                </button>
                <ReactTooltip place="bottom" effect="solid" id="mail">
                  Subscribe to get an email whenever {userData.fullname}{" "}
                  publishes
                </ReactTooltip>
              </div>
            )}

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
                  userBlogs={userBlogs}
                  blogsLoading={blogsLoading}
                />
              ) : selectedTab === "about" ? (
                <AboutSection />
              ) : (
                "null"
              )}
            </div>
          </div>
        </>
      </div>
      <Sidebar content={<SidebarContent />} />
    </div>
  );
}

export default User;
