import React, { useState } from "react";
import "./IssueTabs.css";
import arrowDown from "../../assets/arrow_down_thin.svg";
import arrowUp from "../../assets/arrow_up_thin.svg";
import screenshot from "../../assets/screenshot.png";

const IssueTabs = ({ scanData, criteriaData }) => {
  const [activeSeverity, setActiveSeverity] = useState("critical");
  const [expandedIssue, setExpandedIssue] = useState(null);

  const severities = ["critical", "serious", "moderate", "minor"];
  const severityNames = {
    critical: "Critical",
    serious: "Serious",
    moderate: "Moderate",
    minor: "Minor",
  };

  const handleExpand = (id) => {
    setExpandedIssue(expandedIssue === id ? null : id);
  };

  return (
    <div className="issues-tabs">
      <div className="tab-header">
        {severities.map((severity) => (
          <h3
            key={severity}
            className={activeSeverity === severity ? "active" : ""}
            onClick={() => setActiveSeverity(severity)}
          >
            {severityNames[severity].toUpperCase()} (
            {scanData.criterias.issues[severity].length})
          </h3>
        ))}
      </div>

      <div className="tab-content">
        <div className="legend">
          <p>
            <span>A</span> - level A
          </p>
          <p>
            <span>AA</span> - level AA
          </p>
          <p>
            <span>AAA</span> - level AAA
          </p>
        </div>
        <div className="issues-content">
          <div className="issue-dropdown">
            {scanData.criterias.issues[activeSeverity].map((id) => (
              <div key={id} className="issue">
                <div className="issue-header" onClick={() => handleExpand(id)}>
                  <span>
                    <span className="bold">{criteriaData[id].level}</span> -{" "}
                    {criteriaData[id].title}
                  </span>
                  <span>
                    {expandedIssue === id ? (
                      <img src={arrowUp} />
                    ) : (
                      <img src={arrowDown} />
                    )}
                  </span>
                </div>
                {expandedIssue === id && (
                  <div className="issue-details">
                    <p>{criteriaData[id].description}</p>

                    <p>
                      <span className="bold">WHY: </span>
                      {criteriaData[id].why}
                    </p>
                    <p>
                      {" "}
                      Refer to the documentation{" "}
                      <a
                        href={criteriaData[id].link_to_docs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here.
                      </a>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <img
              src={screenshot}
              alt="Screenshot of the issue"
              className="screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTabs;
