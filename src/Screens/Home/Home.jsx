import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import PageLoader from "../../Components/PageLoader/PageLoader";
import BlogCard from "../../Components/BlogCard/BlogCard";

function Home() {
  const [blogsList, setBlogsList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = () => {
    setShowLoader(true);
    axios
      .post(BaseURL + "/blogs/get-list")
      .then((res) => {
        if (res.status == 200) setBlogsList(res.data);
        console.log("Response: ", res);
      })
      .catch((err) => console.log("Error: ", err))
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showLoader) return <PageLoader />;

  return (
    <div className={styles.home_container}>
      <div className={styles.home_body}>
        <div className={styles.responsive_width}>
          <div
            style={{
              backgroundColor: "lightblue",
              margin: "10px",
              marginTop: 0,
              padding: "10px",
            }}
          >
            Topics
          </div>
          <div
            style={{
              backgroundColor: "lightgreen",
              margin: "10px",
              padding: "10px",
            }}
          >
            Following
          </div>
          <div className={styles.blog_list}>
            {blogsList.map((blog) => (
              <div
                style={{
                  width: "100%",
                }}
                key={blog.id}
              >
                <BlogCard blog={blog} />
                <hr
                  style={{
                    marginTop: "1em",
                    marginBottom: "1em",
                    borderColor: "#f0f0f0",
                    borderWidth: "0.1px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
