import React from "react";
import "./DeleteModal.css"; // Add your modal styles here
import Button from "../Button/Button";
import close from "../../assets/close.svg";

const Modal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div>
        <div className="modal-content">
          <div className="close-container">
            <img
              src={close}
              alt="CLose the deletion confirmation pop-up"
              onClick={onClose}
            />
          </div>
          <p>Are you sure you want to delete this scan?</p>
          <div className="delete-btns-container">
            <Button onClick={onConfirm} text="Yes" />
            <Button onClick={onClose} text="No" type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
