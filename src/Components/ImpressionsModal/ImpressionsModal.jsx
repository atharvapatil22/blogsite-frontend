import React, { useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";
import Comments from "./Comments";
import styles from "./ImpressionsModal.module.css";
import UserList from "./UserList";

const ImpressionsModal = ({
  show,
  onClose,
  type,
  arrayOfUserIDs,
  incrementCount,
  blogId,
  blogComments,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);

  return (
    <React.Fragment>
      <div
        ref={modalRef}
        // style={backdropStyle}
        className={styles.modal_wrap}
        onClick={onClose}
      >
        <div
          // style={modalStyle}
          className={styles.modal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.btn_container}>
            <h2 style={{ marginLeft: "1em" }}>
              {type == "comments"
                ? "Comments"
                : type === "likes"
                ? "Likes"
                : type === "followers"
                ? "Followers"
                : type === "following"
                ? "Following"
                : ""}
            </h2>
            <button onClick={onClose} className={styles.close_btn}>
              <GrClose fontSize={"1.6em"} />
            </button>
          </div>
          {type == "comments" ? (
            <Comments
              incrementCount={incrementCount}
              blogId={blogId}
              blogComments={blogComments}
            />
          ) : type === "likes" ? (
            <UserList arrayOfUserIDs={arrayOfUserIDs} type={"Likes"} />
          ) : type === "followers" ? (
            <UserList arrayOfUserIDs={arrayOfUserIDs} type={"Followers"} />
          ) : type === "following" ? (
            <UserList arrayOfUserIDs={arrayOfUserIDs} type={"Following"} />
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImpressionsModal;
