import styles from "./Blog.module.css";
import "./Blog_Draftail.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import { DraftailEditor } from "draftail";
import PageLoader from "../../Components/PageLoader/PageLoader";
import { BsThreeDots, BsTwitter, BsFacebook, BsLinkedin } from "react-icons/bs";
import { ImLink } from "react-icons/im";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { IoChatbubbleOutline, IoShareOutline } from "react-icons/io5";

function Blog() {
  let { blogID } = useParams();

  const [blogContent, setBlogContent] = useState(null);
  const [blogInfo, setBlogInfo] = useState(null);
  const [showLoader, setshowLoader] = useState(false);

  const fetchData = () => {
    setshowLoader(true);
    axios
      .get(BaseURL + `/blogs/${blogID}`)
      .then((res) => {
        console.log("Response:", res.data);
        let { content, ...blog_info } = res.data;
        setBlogInfo(blog_info);
        setBlogContent(res.data.content);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setshowLoader(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showLoader) return <PageLoader />;

  const PublishingDate = ({ dateString }) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObj = new Date(dateString);
    const today = new Date();

    const date = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getUTCFullYear();

    return (
      <div>{`${date} ${month} ${
        year != new Date().getFullYear() ? year : ""
      }`}</div>
    );
  };

  const ShareBtns = ({ forMobile }) => {
    return (
      <>
        {forMobile && (
          <button
            className={`${styles.share_btns} ${styles.save_btn_mobile}`}
            type="button"
          >
            <MdOutlineBookmarkAdd size={"1.4em"} />
            &nbsp;Save&nbsp;
          </button>
        )}
        <button className={styles.share_btns} type="button">
          <BsTwitter size={"1.4em"} />
        </button>
        <button className={styles.share_btns} type="button">
          <BsFacebook size={"1.4em"} />
        </button>
        <button className={styles.share_btns} type="button">
          <BsLinkedin size={"1.4em"} />
        </button>
        <button className={styles.share_btns} type="button">
          <ImLink size={"1.4em"} />
        </button>
        {!forMobile && (
          <button className={styles.share_btns} type="button">
            <MdOutlineBookmarkAdd size={"1.4em"} />
          </button>
        )}
      </>
    );
  };

  return (
    <div className={`blog_container ${styles.blog_container}`}>
      <div className={`blog_body ${styles.blog_body}`}>
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
                  <p className={styles.author_fullname}>
                    {blogInfo.author_fullname}{" "}
                    <button className={styles.follow_btn} type="button">
                      Follow
                    </button>
                  </p>
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
              <button className={styles.options_btn} type="button">
                <BsThreeDots size={"1.6em"} />
              </button>
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
          <DraftailEditor
            className="editor"
            rawContentState={blogContent}
            readOnly
          />
        )}

        <div
          className={`${styles.blog_footer} ${styles.responsive_width}`}
          id="blog_footer"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className={styles.footer_btns}
                style={{
                  marginLeft: 0,
                }}
                type="button"
              >
                <RiThumbUpLine size={"1.5em"} />
                &nbsp;{20}
              </button>
              <button className={styles.footer_btns} type="button">
                <IoChatbubbleOutline size={"1.5em"} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className={styles.footer_btns} type="button">
                <IoShareOutline size={"1.5em"} />
              </button>
              <button className={styles.footer_btns} type="button">
                <MdOutlineBookmarkAdd size={"1.5em"} />
              </button>
              <button
                className={styles.footer_btns}
                style={{ marginRight: 0 }}
                type="button"
              >
                <BsThreeDots size={"1.5em"} />
              </button>
            </div>
          </div>
          <hr />
        </div>

        {!!blogContent && (
          <div
            className={`${styles.blog_recomended} ${styles.responsive_width}`}
          >
            <h1>Recomended Blogs:</h1>
            <p>Card1</p>
            <p>Card2</p>
            <p>Card3</p>
          </div>
        )}

        <div style={{ height: "100vh" }}></div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Blog;
