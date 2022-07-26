import React from "react";
import Modal from "../Modal/Modal";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import styles from "./AboutSite.module.css";

function AboutSite({ onClose }) {
  return (
    <Modal show={true} onClose={onClose} bgColor={"#afaeae8d"}>
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
          <li>Option to add links, images etc in blogs</li>
          <li>Saving Blogs to drafts</li>
          <li>Topics: Blogs could be tagged with one or more topics</li>
          <li>
            Blog Recommendation based on topic and recent browsing history
          </li>
          <li>Option to save blogs to collections(public/private)</li>
          <li>Notifications</li>
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
          <BsLinkedin size={"1.2em"} style={{ marginRight: "4%" }} /> Connect on
          LinkedIn
        </button>
      </div>
    </Modal>
  );
}

export default AboutSite;
