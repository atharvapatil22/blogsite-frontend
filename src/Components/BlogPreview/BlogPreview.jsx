import "./BlogPreview.css";
import React from "react";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";

function BlogPreview({
  setPreviewVisible,
  blogImageObj,
  setBlogTitle,
  blogTitle,
}) {
  const store = useSelector((state) => state);
  const currentUser = store.globalData.authUser;

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
            <button className="final-publish-btn" type="button">
              Publish Now
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BlogPreview;
