import "./Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import Modal from "../../Components/Modal/Modal";
import AuthForm from "../../Components/AuthForm/AuthForm";
import PageLoader from "../../Components/PageLoader/PageLoader";

function Home() {
  const [blogsList, setBlogsList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    setShowLoader(true);
    axios
      .get(BaseURL + "/blogs/list")
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
    <div className="home-container">
      <div className="home-body">
        <div className="blog-list">
          {blogsList.map((obj) => (
            <div
              key={obj.id}
              className="blog-item"
              onClick={() => navigate(`/blog/${obj.id}`)}
            >
              <p>{obj.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Home;
