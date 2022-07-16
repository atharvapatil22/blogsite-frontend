import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import AuthForm from "../../Components/AuthForm/AuthForm";
import Modal from "../../Components/Modal/Modal";
import { BsLinkedin, BsGithub, BsChevronCompactDown } from "react-icons/bs";
import { MdTrendingUp, MdClose } from "react-icons/md";
import axios from "axios";
import { BaseURL } from "../../environment";
import PublishingDate from "../../Components/PublishingDate";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";
import AnimatedLogo from "../../Components/AnimatedLogo/AnimatedLogo";
import { useSelector } from "react-redux";

function LandingPage({ setPageTitle }) {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authFormType, setauthFormType] = useState("login");
  const [showAbout, setShowAbout] = useState(false);
  const [blogsList, setBlogsList] = useState([]);

  const mainmenu = useRef(null);
  const layer2 = useRef(null);
  const menuicon = useRef(null);
  const item1 = useRef(null);
  const item2 = useRef(null);
  const item3 = useRef(null);
  const item4 = useRef(null);
  const item5 = useRef(null);
  // const item6 = useRef(null);
  const trending = useRef(null);
  const scroll_down_icon = useRef(null);

  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    setTimeout(afterAnimation, 5200);
    setPageTitle("Cogito - Where good ideas find you.");
    fetchData();

    return () => {
      setPageTitle("Cogito");
    };
  }, []);

  const afterAnimation = () => {
    scroll_down_icon.current.style.display = "block";
  };

  const fetchData = () => {
    // setShowLoader(true);
    axios
      .post(BaseURL + "/blogs/get-list", { limit: 4 })
      .then((res) => {
        if (res.status == 200) setBlogsList(res.data);
        console.log("Response: ", res);
      })
      .catch((err) => console.log("Error: ", err))
      .finally(() => {
        // setShowLoader(false);
      });
  };

  const showMenu = () => {
    mainmenu.current.style.top = "0px";
    layer2.current.style.top = "0px";

    setTimeout(() => {
      mainmenu.current.style.clipPath =
        "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)";
      layer2.current.style.clipPath =
        "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)";

      // LIs
      [item1, item2, item3, item4, item5].forEach((item) => {
        item.current.style.top = "0px";
        item.current.style.opacity = "1";
      });
    }, 100);
  };

  const hideMenu = () => {
    [item1, item2, item3, item4, item5].forEach((item) => {
      item.current.style.top = "50px";
      item.current.style.opacity = "0";
    });

    mainmenu.current.style.clipPath =
      "polygon(0% 30%,100% 0%,100% 100%, 0% 100%)";
    mainmenu.current.style.transition =
      "all 0.77s cubic-bezier(0.5,0.1,0.8,0.1)";
    layer2.current.style.clipPath =
      "polygon(0% 30%,100% 0%,100% 100%, 0% 100%)";
    layer2.current.style.transition = "all 0.8s cubic-bezier(0.5,0.1,0.8,0.1)";

    setTimeout(() => {
      mainmenu.current.style.top = "100%";
      layer2.current.style.top = "100%";
    }, 300);

    setTimeout(() => {
      mainmenu.current.style.clipPath =
        "polygon(0% 30%,100% 0%,100%,100%,0% 100%)";
      layer2.current.style.clipPath =
        "polygon(0% 30%,100% 0%,100%,100%,0% 100%)";
      layer2.current.style.transition =
        "all 0.7s cubic-bezier(0.5,0.1,0.9,0.2)";
    }, 1200);
  };

  const goToAuthorProfile = (e, author_id) => {
    e.stopPropagation();
    if (author_id === currentUser_ID) navigate("/profile");
    else navigate(`/user/${author_id}`);
  };

  const Menu = () => {
    return (
      <div id={styles.mobile_menu}>
        <div ref={mainmenu} id={styles.mainmenu}>
          <ul>
            <li ref={item1}>
              <button type="button" onClick={() => setShowAbout(true)}>
                About
              </button>
            </li>
            <li ref={item2}>
              <button
                type="button"
                onClick={() => {
                  setauthFormType("login");
                  setShowAuthForm(true);
                }}
              >
                Login
              </button>
            </li>
            <li ref={item3}>
              <button
                type="button"
                onClick={() => {
                  setauthFormType("sign-up");
                  setShowAuthForm(true);
                }}
              >
                Create Account
              </button>
            </li>
            {/* <li ref={item4}>
              <button>Browse without login</button>
            </li> */}
            <li ref={item4}>
              <button>Help</button>
            </li>
            <li ref={item5}>
              <button onClick={() => navigate("/settings")}>Settings</button>
            </li>
          </ul>
          <div id={styles.close} onClick={hideMenu}>
            <MdClose id={styles.icon} />
          </div>
        </div>
        <div ref={layer2} id={styles.layer2}></div>
      </div>
    );
  };

  const AboutModal = () => {
    return (
      <Modal
        show={true}
        onClose={() => setShowAbout(false)}
        bgColor={"#afaeae8d"}
      >
        <div className={styles.about_modal}>
          <h2>
            Cogito is an open platform where readers can come to find insightful
            and dynamic thinking. Here, expert and undiscovered voices alike can
            dive into the heart of any topic and bring new ideas to the surface.
            Our purpose is to spread these ideas and deepen understanding of the
            world.
          </h2>
          <AnimatedLogo />
          <hr />
          <h3>Tech Stack:</h3>
          <p>
            Frontend: React JS
            <br />
            Backend: Express JS + PostgreSQL
            <br />
            Other Tools: Redux, JWT, Draftail Editor
          </p>
          <h3>Some Prominent Features:</h3>
          <ul>
            <li>JWT based authentication System</li>
            <li>Seamless Animations</li>
            <li>Full Responsive Design (except write blogs page)</li>
            <li>React Router Dom v6 with Public and Private routes</li>
            <li>Users Can write blogs with a wide range of tools</li>
            <li>
              They can interact with articles via likes, comments, sharing etc
            </li>
            <li>Users Can follow each other</li>
          </ul>
          <h3>Features under development:</h3>
          <ul>
            <li>Responsive Write Blogs Page</li>
            <li>Saving Blogs to drafts</li>
            <li>Topics: Blogs could be tagged with one or more topics</li>
            <li>
              Blog Recommendation based on topic and recent browsing history
            </li>
            <li>Option to save blogs to collections(public/private)</li>
            <li>Notifications</li>
            <li>Settings Page</li>
          </ul>
          <button
            style={{ marginTop: "2em" }}
            onClick={() =>
              window.open(
                "https://github.com/atharvapatil22/blogsite-frontend",
                "_blank"
              )
            }
          >
            <div style={{ marginRight: "4%" }}>
              <BsGithub size={"1.2em"} />
            </div>
            Source code
          </button>
          <br />
          <button
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/atharva-patil-6a406a1b9/",
                "_blank"
              )
            }
          >
            <BsLinkedin size={"1.2em"} style={{ marginRight: "4%" }} /> Follow
            me on linkedin
          </button>
        </div>
      </Modal>
    );
  };

  const currentUser_ID = store.globalData.authUser?.id;

  return (
    <div className={styles.landing_page}>
      {!!showAuthForm && (
        <AuthForm
          dontSendBack
          hideForm={() => setShowAuthForm(false)}
          type={authFormType}
        />
      )}
      {!!showAbout && <AboutModal />}
      <Menu />

      <div className={styles.banner}>
        <div className={styles.landing_main}>
          <div id={styles.box1}></div>
          <div id={styles.box2}>
            <div id={styles.text}>Stay curious.</div>
          </div>
          <div id={styles.box2a}>
            <div id={styles.sub_text}>
              Discover stories, thinking, and expertise from writers on any
              topic.
            </div>
          </div>
          <div id={styles.box3}>
            <div id={styles.nav_container}>
              <div id={styles.logo}>
                <img src={require("../../assets/cogito_logo_white.png")} />
              </div>
              <div id={styles.menu}>
                <ul>
                  <li className={styles.hide_for_mobile}>
                    <button type="button" onClick={() => setShowAbout(true)}>
                      About
                    </button>
                  </li>
                  <li className={styles.hide_for_mobile}>
                    <button
                      type="button"
                      onClick={() => {
                        setauthFormType("login");
                        setShowAuthForm(true);
                      }}
                    >
                      Login
                    </button>
                  </li>
                  <li
                    id={styles.menu_btn}
                    style={{ display: "flex" }}
                    onClick={showMenu}
                  >
                    <div ref={menuicon} id={styles.menuicon}>
                      <div id={styles.line1}></div>
                      <div id={styles.line2}></div>
                      <div id={styles.line3}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            ref={scroll_down_icon}
            id={styles.scroll_down_icon}
            onClick={() => {
              scroll_down_icon.current.style.display = "none";
              trending.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p>See what's Trending</p>
            <BsChevronCompactDown size={"2em"} color={"#ffffff60"} />
          </div>
        </div>
      </div>
      <div className={styles.trending} ref={trending}>
        <h3>
          <MdTrendingUp id={styles.trending_icon} /> Trending on Cogito{" "}
        </h3>
        <div className={styles.grid_container}>
          {!!blogsList ? (
            <div>
              {blogsList.map((blog, index) => (
                <div
                  key={index}
                  className={styles.card}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                >
                  <div className={styles.card_heading}>
                    <img
                      src={blog.author_avatar}
                      alt=""
                      onClick={(e) => goToAuthorProfile(e, blog.author_id)}
                    />
                    <p onClick={(e) => goToAuthorProfile(e, blog.author_id)}>
                      {blog.author_fullname}
                    </p>
                  </div>
                  <h4>{blog.title}</h4>
                  <div className={styles.card_footer}>
                    <p>
                      <PublishingDate dateString={blog.blog_date} />
                    </p>
                    <p style={{ margin: "0 2%" }}>∙</p>
                    <p>{blog.length_in_time} min read</p>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate("/home")}>Show More ...</button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "2.5%",
                fontSize: "1.1em",
                color: "grey",
              }}
            >
              Loading <SpinnerLoader color={"grey"} />
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <p style={{ marginRight: "1%" }}>© 2022 Atharva Patil</p>
        <button onClick={() => setShowAbout(true)}>About</button>
        <button>Help</button>
        <button
          onClick={() =>
            window.open(
              "https://github.com/atharvapatil22/blogsite-frontend",
              "_blank"
            )
          }
        >
          <BsGithub size={"1.2em"} />
        </button>
        <button
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/atharva-patil-6a406a1b9/",
              "_blank"
            )
          }
        >
          <BsLinkedin size={"1.2em"} />
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
