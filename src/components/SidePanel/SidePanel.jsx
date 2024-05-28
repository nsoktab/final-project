import React from "react";
import "./SidePanel.css";
import pin from "../../assets/pin.svg";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <h2>HOME PAGE</h2>
      <div className="level-container">
        <div className="level">
          <div className="level-bar level-a"></div>
          <div className="level-bar level-b"></div>
          <div className="level-bar level-c"></div>
        </div>
        <p>Level A</p>
      </div>
      <div className="level-container">
        <div className="level">
          <div className="level-bar level-a"></div>
          <div className="level-bar level-b"></div>
          <div className="level-bar level-c"></div>
        </div>
        <p>Level AA</p>
      </div>
      <div className="level-container">
        <div className="level">
          <div className="level-bar level-a"></div>
          <div className="level-bar level-b"></div>
          <div className="level-bar level-c"></div>
        </div>
        <p>Level AAA</p>
      </div>
      <p className="last-scan">Last scan: 6th May 2024</p>
      <hr />
      <h3>Pinned issues</h3>
      <div className="pinned-issues">
        <p>
          <span className="bullet">
            <img src={pin} alt="Icon for pinned issues" className="pin" />
          </span>
          Nothing has been added yet.
        </p>
      </div>
      <hr />
      <h3>Notes</h3>
      <div className="notes"></div>
    </div>
  );
};

export default SidePanel;
