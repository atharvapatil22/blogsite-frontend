import "./Modal.css";
import React, { useEffect, useRef } from "react";
import { GrClose } from "react-icons/gr";

const Modal = ({
  modalStyle,
  children,
  show,
  onClose,
  backdropStyle,
  bgColor,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add("visible");
    } else {
      modalRef.current.classList.remove("visible");
    }
  }, [show]);
  return (
    <React.Fragment>
      <div ref={modalRef} style={backdropStyle} className="modal-wrap">
        <div style={modalStyle} className="modal">
          <div
            style={{ backgroundColor: bgColor ? bgColor : "" }}
            className="btn-container"
          >
            <button onClick={onClose} className={"close-btn"}>
              <GrClose fontSize={"1.6em"} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
