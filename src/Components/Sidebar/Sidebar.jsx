import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import AboutSite from "../AboutSite/AboutSite";

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className={styles.sidebar_container}>
      {!!showAbout && <AboutSite onClose={() => setShowAbout(false)} />}
      <div className={styles.header}>
        <div className={styles.searchbar}>
          <IoSearchOutline size={"1.3em"} id={styles.icon} color={"black"} />

          <input
            maxLength={50}
            placeholder="Search"
            type="text"
            onKeyPress={(e) => {
              const keyCode = e.code || e.key;
              if (keyCode == "Enter") {
                setSearchTerm("");
                return false;
              }
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div>MAin</div>
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

export default Sidebar;
