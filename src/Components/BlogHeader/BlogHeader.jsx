import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../environment";
import AuthForm from "../AuthForm/AuthForm";
import PublishingDate from "../PublishingDate";
import styles from "./BlogHeader.module.css";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { BsThreeDots, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { ImLink } from "react-icons/im";

function BlogHeader({ selfBlog, blogInfo, isFollowing }) {
  const store = useSelector((state) => state);
  const navigate = useNavigate();

  const [following, setFollowing] = useState(isFollowing);
  const [disableFollowBtn, setDisableFollowBtn] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleFollow = () => {
    const currentUserID = store.globalData.authUser?.id;

    if (currentUserID == null) {
      setShowAuthForm(true);
      return;
    }
    setDisableFollowBtn(true);
    axios
      .post(BaseURL + "/users/follow", {
        source_user: currentUserID,
        target_user: blogInfo.author_id,
        type: following ? "unfollow" : "follow",
      })
      .then((res) => {
        console.log("res:", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setFollowing(!following);
        setDisableFollowBtn(false);
      });
  };

  const shareBlog = (type) => {
    let link = "";
    const uri = window.location.href;

    if (type === "twitter") {
      link =
        "http://twitter.com/share?url=" +
        encodeURIComponent(uri) +
        "&text=" +
        encodeURIComponent("Check out this blog");
      // "",
      // "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0";
    } else if (type === "facebook")
      link = "https://www.facebook.com/sharer.php?u=" + encodeURIComponent(uri);
    else if (type === "linkedin")
      link =
        "https://www.linkedin.com/shareArticle?mini=true&url=" +
        encodeURIComponent(uri);

    window.open(link);
  };

  const toolTipProps = {
    place: "bottom",
    effect: "solid",
    type: "light",
    border: true,
    borderColor: "grey",
    arrowColor: "white",
    globalEventOff: "click",
    clickable: true,
    dataEvent: "click",
  };

  const ShareBtns = ({ forMobile }) => {
    return (
      <>
        {forMobile && (
          <button
            data-tip
            data-for="share_save"
            className={`${styles.share_btns} ${styles.save_btn_mobile}`}
            type="button"
            onClick={() => alert("Feature is under development")}
          >
            <MdOutlineBookmarkAdd size={"1.4em"} />
            &nbsp;Save&nbsp;
          </button>
        )}
        <button
          className={styles.share_btns}
          type="button"
          data-tip
          data-for="share_twitter"
          onClick={() => shareBlog("twitter")}
        >
          <BsTwitter size={"1.4em"} />
        </button>
        <button
          className={styles.share_btns}
          type="button"
          data-tip
          data-for="share_facebook"
          onClick={() => shareBlog("facebook")}
        >
          <BsFacebook size={"1.4em"} />
        </button>
        <button
          className={styles.share_btns}
          type="button"
          data-tip
          data-for="share_linkedin"
          onClick={() => shareBlog("linkedin")}
        >
          <BsLinkedin size={"1.4em"} />
        </button>
        <button
          className={styles.share_btns}
          type="button"
          data-tip
          data-for="share_link"
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
            toast("Link Copied", { position: "top-center", theme: "dark" });
          }}
        >
          <ImLink size={"1.4em"} />
        </button>
        {!forMobile && (
          <button
            className={styles.share_btns}
            type="button"
            data-tip
            data-for="share_save"
            onClick={() => alert("Feature is under development")}
          >
            <MdOutlineBookmarkAdd size={"1.4em"} />
          </button>
        )}
        <ToastContainer />
        <ReactTooltip id="share_twitter" place="top" effect="solid">
          Share on Twitter
        </ReactTooltip>
        <ReactTooltip id="share_facebook" place="top" effect="solid">
          Share on Facebook
        </ReactTooltip>
        <ReactTooltip id="share_linkedin" place="top" effect="solid">
          Share on LinkedIn
        </ReactTooltip>
        <ReactTooltip id="share_link" place="top" effect="solid">
          Copy Link
        </ReactTooltip>
        <ReactTooltip id="share_save" place="top" effect="solid">
          Save
        </ReactTooltip>
      </>
    );
  };

  const MoreOptions = () => {
    const currentUser_ID = store.globalData.authUser?.id;

    if (blogInfo.author_id === currentUser_ID)
      return (
        <>
          {["Edit this article", "Email to subscribers"].map((item, index) => (
            <div key={index}>
              <a href="#">{item}</a>
              <br />
            </div>
          ))}
          <hr />
          {["Story Settings", "Story Stats"].map((item, index) => (
            <div key={index}>
              <a href="#">{item}</a>
              <br />
            </div>
          ))}
          <hr />
          {["Hide Responses", "Delete Story"].map((item, index) => (
            <div key={index}>
              <a href="#">{item}</a>
              <br />
            </div>
          ))}
        </>
      );
    else
      return (
        <>
          {["Show Less Like This", "Mute this author", "Report"].map(
            (item, index) => (
              <div key={index}>
                <a href="#">{item}</a>
                <br />
              </div>
            )
          )}
        </>
      );
  };

  const goToAuthorProfile = () => {
    if (selfBlog) navigate("/profile");
    else navigate(`/user/${blogInfo.author_id}`);
  };

  return (
    <>
      {!!showAuthForm && (
        <AuthForm
          dontSendBack
          message="Login to follow users"
          hideForm={() => setShowAuthForm(false)}
          type={"login"}
        />
      )}
      <div className={`${styles.blog_header} ${styles.responsive_width}`}>
        <img
          onClick={goToAuthorProfile}
          className={styles.author_img}
          src={blogInfo.author_avatar}
          alt=""
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.header_section_1}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <p
                onClick={goToAuthorProfile}
                className={styles.author_fullname}
                // data-tip
                // data-for="author_name"
              >
                {blogInfo.author_fullname}{" "}
              </p>
              {!selfBlog && (
                <button
                  disabled={disableFollowBtn}
                  className={styles.follow_btn}
                  type="button"
                  onClick={handleFollow}
                  id={following ? styles.following_btn : ""}
                >
                  {following ? "Following" : "Follow"}
                </button>
              )}
              {/* <ReactTooltip
                      id="author_name"
                      place="top"
                      effect="solid"
                      {...toolTipProps}
                    >
                      <div style={{ display: "flex" }}>
                        <img
                          className={styles.author_img}
                          src={blogInfo.author_avatar}
                          alt=""
                        />
                        <p>{blogInfo.author_fullname}</p>
                      </div>
                    </ReactTooltip> */}
            </div>
            <div
              style={{
                display: "flex",
                color: "grey",
                // backgroundColor: "red",
                padding: 0,
                margin: 0,
                height: "2em",
              }}
            >
              <PublishingDate dateString={blogInfo.blog_date} />
              &nbsp;{" . "}&nbsp; {blogInfo.length_in_time} min read
            </div>
          </div>
          <div className={styles.header_section_2}>
            <ShareBtns forMobile={false} />
          </div>
        </div>
        <button
          className={styles.options_btn}
          type="button"
          data-tip
          data-for="header_more"
          data-event="click"
        >
          <BsThreeDots size={"1.6em"} />
        </button>

        <ReactTooltip
          {...toolTipProps}
          id="header_more"
          className={styles.tooltip_modal}
        >
          <MoreOptions />
        </ReactTooltip>
      </div>
      <div className={`${styles.mobile_share_btns} ${styles.responsive_width}`}>
        <ShareBtns forMobile={true} />
      </div>
      <div
        className={`${styles.blog_title_and_img} ${styles.responsive_width}`}
      >
        <p>{blogInfo.title}</p>
        <img src={blogInfo.image} alt="" />
      </div>
    </>
  );
}

export default BlogHeader;
