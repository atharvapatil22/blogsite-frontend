import "./Blog.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import { DraftailEditor } from "draftail";
import PageLoader from "../../Components/PageLoader/PageLoader";

function Blog() {
  let { blogID } = useParams();

  const [blogBody, setBlogBody] = useState(null);
  const [showLoader, setshowLoader] = useState(false);

  const fetchData = () => {
    setshowLoader(true);
    axios
      .get(BaseURL + `/blogs/${blogID}`)
      .then((res) => {
        console.log("Response:", res.data.content);
        if ((res.status = 200)) setBlogBody(res.data.content);
      })
      .catch((err) => console.log("Error:", err))
      .finally(() => setshowLoader(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (showLoader) return <PageLoader />;

  return (
    <div className="blog-container">
      <div className="blog-body">
        {!!blogBody && (
          <DraftailEditor
            className="editor"
            rawContentState={blogBody}
            readOnly
          />
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Blog;
