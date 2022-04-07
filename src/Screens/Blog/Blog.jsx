import "./Blog.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";
import { BaseURL } from "../../environment";
import { DraftailEditor } from "draftail";

function Blog() {
  let { blogID } = useParams();

  const [blogBody, setBlogBody] = useState(null);

  const fetchData = () => {
    axios
      .get(BaseURL + `/blogs/${blogID}`)
      .then((res) => {
        console.log("Response:", res.data.content);
        if ((res.status = 200)) setBlogBody(res.data.content);
      })
      .catch((err) => console.log("Error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
