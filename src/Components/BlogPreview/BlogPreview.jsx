import "./BlogPreview.css";
import React from "react";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { serialiseEditorStateToRaw } from "draftail";
import axios from "axios";
import { BaseURL } from "../../environment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

function BlogPreview({
  setPreviewVisible,
  blogImageObj,
  setBlogTitle,
  blogTitle,
  editorState,
}) {
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const currentUser = store.globalData.authUser;

  const [showLoader, setShowLoader] = useState(false);

  const publishBlog = () => {
    // Later Add topic,length_in_time,comments

    const blogContent = serialiseEditorStateToRaw(editorState);
    let errMsg = null;

    // Validate Fields
    if (blogTitle == false) errMsg = "Blog must have title!";
    else if (blogImageObj == null) errMsg = "Blog must have image!";
    else if (blogContent == null) errMsg = "Blog cannot be empty";

    if (errMsg) {
      alert(errMsg);
      return;
    }

    // set new Blog
    const newBlog = {};
    newBlog.title = blogTitle;
    newBlog.content = blogContent;
    newBlog.topic = "none";
    newBlog.date = new Date().toISOString().substring(0, 10);
    newBlog.length_in_time = 0;
    newBlog.thumbs = 0;
    newBlog.comments = "none";
    newBlog.author_id = currentUser.id;

    // Post Blog Image To Cloudinary
    const instance = axios.create();
    const formData = new FormData();
    formData.append("file", blogImageObj);
    formData.append("upload_preset", "mr8cvzpd");

    setShowLoader(true);
    instance
      .post("https://api.cloudinary.com/v1_1/dbanpvg0t/image/upload", formData)
      .then((res) => {
        if (res.status == 200) {
          const imageUrl = res.data.secure_url;
          // console.log("successfully uploaded blog image to cloud", imageUrl);
          newBlog.image = imageUrl;

          console.log("newblog:", newBlog);
          axios
            .post(BaseURL + "/blogs", newBlog)
            .then((res) => {
              setShowLoader(false);
              console.log("Response: ", res);
              if (res.status === 200) {
                alert(res.data.message);
                navigate("/profile");
              }
            })
            .catch((error) => {
              console.log("Error :", error);
            })
            .finally(() => {
              setPreviewVisible(false);
              setShowLoader(false);
            });
        } else console.log("some error occured");
      })
      .catch((err) => {
        setShowLoader(false);
        alert("Some Error occured");
        if (err?.response)
          console.log("Cloudinary Request Failed: ", err.response);
        else console.log("Error: ", err);
      });
  };

  return (
    <div>
      <Modal
        modalStyle={{ minWidth: "80vw", minHeight: "92%" }}
        show={true}
        onClose={() => {
          setPreviewVisible(false);
        }}
      >
        <div className="blog-preview">
          <div className="section-1">
            <h2>Blog Preview</h2>
            <img
              className="preview-blog-image"
              src={URL.createObjectURL(blogImageObj)}
              alt=""
            />
            <h3>Title</h3>
            <input
              className="preview-title"
              type="text"
              name="title"
              value={blogTitle}
              onChange={(e) => {
                setBlogTitle(e.target.value);
              }}
            />
            <p>
              Note: Changes here will affect the title and image in your saved
              draft as well
            </p>
          </div>
          <div className="section-2">
            <p>
              Publishing To:{" "}
              <span style={{ fontWeight: "bold" }}>
                {!!currentUser ? currentUser.fullname : "null"}
              </span>
            </p>
            <h3>Add Tags</h3>
            <input disabled type="text" />
            <div className="email-checkbox">
              <input
                checked={false}
                type="checkbox"
                name=""
                id=""
                onChange={() => alert("Option will be added later")}
              />
              <p>
                Send a link to your email subscribers.
                <br />
                <span style={{ color: "grey" }}>
                  It is only sent to readers who have opted to receive your
                  stories via email, not to all followers
                </span>
              </p>
            </div>
            <button
              disabled={showLoader}
              onClick={publishBlog}
              className={`final-publish-btn ${
                showLoader && "disabled-publish-btn"
              }`}
              type="button"
            >
              <div>Publish Now {!!showLoader && <SpinnerLoader />}</div>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BlogPreview;
