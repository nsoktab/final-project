import React from "react";
import "./Button.css";

const Button = ({ type, text, onClick }) => {
  const buttonClass = type === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <div className={`btn ${buttonClass}`} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
