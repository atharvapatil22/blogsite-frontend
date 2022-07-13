import React, { useState, useEffect, useRef } from "react";
import styles from "./LandingPage.module.css";
import AuthForm from "../../Components/AuthForm/AuthForm";
import Modal from "../../Components/Modal/Modal";
import { GrClose } from "react-icons/gr";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { MdTrendingUp } from "react-icons/md";
import axios from "axios";
import { BaseURL } from "../../environment";

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

  useEffect(() => {
    setPageTitle("Cogito - Where good ideas find you.");
    fetchData();

    return () => {
      setPageTitle("Cogito");
    };
  }, []);

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
      item1.current.style.top = "0px";
      item1.current.style.opacity = "1";
      item2.current.style.top = "0px";
      item2.current.style.opacity = "1";
      item3.current.style.top = "0px";
      item3.current.style.opacity = "1";
      item4.current.style.top = "0px";
      item4.current.style.opacity = "1";
    }, 100);
  };

  const hideMenu = () => {
    item1.current.style.top = "50px";
    item1.current.style.opacity = "0";
    item2.current.style.top = "50px";
    item2.current.style.opacity = "0";
    item3.current.style.top = "50px";
    item3.current.style.opacity = "0";
    item4.current.style.top = "50px";
    item4.current.style.opacity = "0";

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

  const TempMenu = () => {
    return (
      <div id={styles.mobile_menu}>
        <div ref={mainmenu} id={styles.mainmenu}>
          <ul>
            <li ref={item1}>Home</li>
            <li ref={item2}>About</li>
            <li ref={item3}>Project</li>
            <li ref={item4}>Work</li>
          </ul>
          <div id={styles.close} onClick={hideMenu}>
            <GrClose />
          </div>
        </div>
        <div ref={layer2} id={styles.layer2}></div>
      </div>
    );
  };

  const AboutModal = () => {
    return (
      <Modal show={true} onClose={() => setShowAbout(false)}>
        <h2>
          Cogito is a blog hosting platform. Anyone can write and express their
          ideas. Users can read articles by others on a wide range of topics.
        </h2>
        <h3>For Recruters:</h3>
        <p>
          Frontend: React JS
          <br />
          Backend: Express JS + Postgres
          <br />
          Other Tools: CSS Modules,redux,JWT,Draftail Editor
        </p>
        <p>
          This is my first full stack project. I built it to practice the
          concepts i have learnt. All into one site. This is my first time
          experimenting with css aimations, authentication systems, Sql based
          backends
        </p>
        <h3>Some of the Features are:</h3>
        <ul>
          <li>Top Class Animations</li>
          <li>Full Responsive Design (except write blogs page)</li>
          <li>JWT based authentication System</li>
          <li>React Routing(public and priv routes)</li>
          <li>Users Can write blogs with a wide range of tools</li>
          <li>
            They can interact with others articles (likes,comments,sharing etc)
          </li>
          <li>Users Can follow each other</li>
        </ul>
        <h3>Features under development:</h3>
        <ul>
          <li>Topics. Blogs being recomended</li>
          <li>Option to save blogs to collections(public/private)</li>
          <li>Notifications</li>
        </ul>
        <a href="#">link to source code </a>
        <p>social media links</p>
      </Modal>
    );
  };

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
      <TempMenu />

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
                <img src={require("../../assets/cogito_logo.png")} />
              </div>
              <div id={styles.menu}>
                <ul>
                  {/* OLD MENU */}

                  {/* <li>
                    <button type="button" onClick={() => setShowAbout(true)}>
                      About
                    </button>
                  </li>
                  <li>
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
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setauthFormType("sign-up");
                        setShowAuthForm(true);
                      }}
                    >
                      Get Started
                    </button>
                  </li> */}

                  {/* NEW TEMP MENU */}
                  <li
                    id={styles.menu_btn}
                    style={{ display: "flex" }}
                    onClick={showMenu}
                  >
                    {/* <p>Menu</p> */}
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
        </div>
      </div>
      <div className={styles.trending}>
        <h3>
          <MdTrendingUp id={styles.trending_icon} /> Trending on Cogito{" "}
        </h3>
        <div className={styles.grid_container}>
          <div className={styles.col}>
            <p>Card</p>
          </div>
          <div className={styles.col}>
            <p>Card</p>
          </div>
          <div className={styles.col}>
            <p>Card</p>
          </div>
          <div className={styles.col}>
            <p>Card</p>
          </div>
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
