import styles from "./Blog.module.css";
import "./Blog_Draftail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import { DraftailEditor } from "draftail";
import PageLoader from "../../Components/PageLoader/PageLoader";
import {
  BsThreeDots,
  BsTwitter,
  BsFacebook,
  BsLinkedin,
  BsLink,
} from "react-icons/bs";
import { ImLink } from "react-icons/im";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { IoChatbubbleOutline, IoShareOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import PublishingDate from "../../Components/PublishingDate";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImpressionsModal from "../../Components/ImpressionsModal/ImpressionsModal";
import AuthForm from "../../Components/AuthForm/AuthForm";

function Blog() {
  let { blogID } = useParams();
  const store = useSelector((state) => state);

  const [blogContent, setBlogContent] = useState(null);
  const [blogInfo, setBlogInfo] = useState(null);
  const [showLoader, setshowLoader] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [disableLikes, setDisableLikes] = useState(false);
  const [impressionsModal, setImpressionsModal] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [selfBlog, setSelfBlog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setshowLoader(true);
    axios
      .get(BaseURL + `/blogs/${blogID}`)
      .then((res) => {
        console.log("Response:", res.data);

        const currentUserID = store.globalData.authUser?.id;
        if (res.data.thumbs.length > 0 && currentUserID) {
          if (res.data.thumbs.includes(currentUserID)) setHasLiked(true);
        }
        if (res.data.author_id === currentUserID) setSelfBlog(true);
        let { content, ...blog_info } = res.data;
        setBlogInfo(blog_info);
        setBlogContent(res.data.content);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setshowLoader(false));
  };

  const updateLikes = () => {
    const currentUserID = store.globalData.authUser?.id;

    if (!currentUserID) {
      setShowAuthForm(true);
      return;
    }

    setDisableLikes(true);
    axios
      .post(BaseURL + "/blogs/update-likes", {
        user_id: currentUserID,
        blog_id: blogInfo.id,
        update_type: hasLiked ? "REMOVE" : "ADD",
      })
      .then((res) => {
        setHasLiked(!hasLiked);
        setBlogInfo({ ...blogInfo, thumbs: res.data.updated_thumbs });
      })
      .catch((err) => console.log("Error occured in update-like api"))
      .finally(() => setDisableLikes(false));
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

  const BlankCard = () => {
    return (
      <div className={styles.blank_card}>
        <div className={styles.blank_body}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
        <div className={styles.blank_img}></div>
      </div>
    );
  };
  // RENDERER
  if (showLoader) return <PageLoader />;

  return (
    <div className={`blog_container ${styles.blog_container}`}>
      <div className={`blog_body ${styles.blog_body}`}>
        {!!showAuthForm && (
          <AuthForm
            dontSendBack
            message="Login to Like Blogs"
            hideForm={() => setShowAuthForm(false)}
            type={"login"}
          />
        )}

        {!!blogInfo && (
          <>
            <div className={`${styles.blog_header} ${styles.responsive_width}`}>
              <img
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
                      className={styles.author_fullname}
                      data-tip
                      data-for="author_name"
                    >
                      {blogInfo.author_fullname}{" "}
                    </p>
                    {!selfBlog && (
                      <button className={styles.follow_btn} type="button">
                        Follow
                      </button>
                    )}
                    <ReactTooltip
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
                    </ReactTooltip>
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
            <div
              className={`${styles.mobile_share_btns} ${styles.responsive_width}`}
            >
              <ShareBtns forMobile={true} />
            </div>

            <div
              className={`${styles.blog_title_and_img} ${styles.responsive_width}`}
            >
              <p>{blogInfo.title}</p>
              <img src={blogInfo.image} alt="" />
            </div>
          </>
        )}

        {!!blogContent && (
          <>
            <DraftailEditor
              className="editor"
              rawContentState={blogContent}
              readOnly
            />
            <ImpressionsModal
              show={!!impressionsModal}
              type={impressionsModal}
              onClose={() => {
                setImpressionsModal(false);
              }}
              blogLikes={blogInfo.thumbs}
            />
          </>
        )}

        <div
          className={`${styles.blog_footer} ${styles.responsive_width}`}
          id="blog_footer"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
            >
              {!!blogInfo && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "initial",
                    width: "auto",
                  }}
                >
                  <button
                    className={` ${styles.footer_btns} ${
                      disableLikes ? styles.disabled_btn : ""
                    } `}
                    style={{
                      marginLeft: 0,
                      marginRight: "0.2em",
                      paddingRight: 0,
                    }}
                    type="button"
                    onClick={updateLikes}
                    disabled={disableLikes}
                  >
                    {hasLiked ? (
                      <RiThumbUpFill size={"1.5em"} />
                    ) : (
                      <RiThumbUpLine size={"1.5em"} />
                    )}
                  </button>
                  <button
                    onClick={() => setImpressionsModal("likes")}
                    style={{ marginLeft: 0, paddingLeft: 0 }}
                    className={styles.footer_btns}
                    type="button"
                  >
                    &nbsp;{blogInfo.thumbs.length}
                  </button>
                </div>
              )}

              <button
                onClick={() => setImpressionsModal("comments")}
                className={styles.footer_btns}
                type="button"
              >
                <IoChatbubbleOutline size={"1.5em"} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className={styles.footer_btns}
                data-tip
                data-for="footer_share"
                data-event="click"
                type="button"
              >
                <IoShareOutline size={"1.5em"} />
              </button>
              <button
                data-tip
                data-for="share_save"
                className={styles.footer_btns}
                type="button"
                onClick={() => alert("Feature is under development")}
              >
                <MdOutlineBookmarkAdd size={"1.5em"} />
              </button>
              <button
                className={styles.footer_btns}
                style={{ marginRight: 0 }}
                type="button"
                data-tip
                data-for="header_more"
                data-event="click"
              >
                <BsThreeDots size={"1.5em"} />
              </button>
              <ReactTooltip
                id="footer_share"
                {...toolTipProps}
                className={`${styles.tooltip_modal} `}
              >
                <button
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    toast("Link Copied", {
                      position: "top-center",
                      theme: "dark",
                    });
                  }}
                >
                  <ImLink />
                  &nbsp;Copy Link
                </button>
                <button onClick={() => shareBlog("twitter")}>
                  <BsTwitter />
                  &nbsp;Share on Twitter
                </button>

                <button onClick={() => shareBlog("facebook")}>
                  <BsFacebook />
                  &nbsp;Share on Facebook
                </button>

                <button onClick={() => shareBlog("linkedin")}>
                  <BsLinkedin />
                  &nbsp;Share on LinkedIn
                </button>
              </ReactTooltip>
            </div>
          </div>
          <hr />
        </div>

        {!!blogContent && (
          <div
            className={`${styles.blog_recomended} ${styles.responsive_width}`}
          >
            <h1>Recomended Blogs:</h1>
            <BlankCard />
            <BlankCard />
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Blog;
