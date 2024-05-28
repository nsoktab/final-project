import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="breadcrumb">
      {paths.map((path, index) => (
        <span key={index}>
          {index < paths.length - 1 ? (
            <>
              <Link to={path.url}>{path.name}</Link> &gt;{" "}
            </>
          ) : (
            <strong>{path.name}</strong>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
