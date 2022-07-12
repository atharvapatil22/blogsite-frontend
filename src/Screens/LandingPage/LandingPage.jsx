import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import AuthForm from "../../Components/AuthForm/AuthForm";
import Modal from "../../Components/Modal/Modal";

function LandingPage({ setPageTitle }) {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authFormType, setauthFormType] = useState("login");
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    setPageTitle("Cogito - Where good ideas find you.");

    return () => {
      setPageTitle("Cogito");
    };
  }, []);

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
                  <li>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mini_home}>Mini Home</div>
    </div>
  );
}

export default LandingPage;
