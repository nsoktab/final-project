import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button text="Go to Home Page" onClick={handleGoHome} />
    </div>
  );
};

export default NotFoundPage;
