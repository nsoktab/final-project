import { useState } from "react";
import "./SummaryTabs.css";
import PieChart from "../PieChartTab/PieChart";
import checkmarkIcon from "../../assets/checkmark.svg"; // Assuming you have a checkmark icon

export default function SummaryTabs({ scanData, criteriaData }) {
  const [activeTab, setActiveTab] = useState("scan");
  const [activeTestSection, setActiveTestSection] = useState("automated");

  const renderTestSection = () => {
    const renderListItem = (id) => (
      <li key={id} className="list-item">
        <img src={checkmarkIcon} alt="Checkmark" className="checkmark" />
        <div className="item-content">
          <span className="item-title">{criteriaData[id].title}</span>
          <span className="item-level">{criteriaData[id].level}</span>
          <a
            href={criteriaData[id].link_to_docs}
            target="_blank"
            rel="noopener noreferrer"
            className="item-link"
          >
            LINK
          </a>
        </div>
      </li>
    );

    switch (activeTestSection) {
      case "automated":
        return (
          <>
            <p>We have checked all those WCAG criterias automatically:</p>
            <ul>
              {scanData.criterias.issues.critical.map(renderListItem)}
              {scanData.criterias.issues.serious.map(renderListItem)}
              {scanData.criterias.issues.moderate.map(renderListItem)}
              {scanData.criterias.issues.minor.map(renderListItem)}
              {scanData.criterias.passed.map(renderListItem)}
            </ul>
          </>
        );
      case "to_review":
        return (
          <>
            <p>
              We run some tests on these criterias, but they require a further
              review.
            </p>
            <ul>{scanData.criterias.to_review.map(renderListItem)}</ul>
          </>
        );
      case "manual":
        return (
          <>
            <p>
              We cannot test these criterias. To ensure that your product is
              accessible, test them manually.
            </p>
            <ul>{scanData.criterias.manual.map(renderListItem)}</ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="summary-tabs">
      <div className="tab-header">
        <h3
          className={activeTab === "scan" ? "active" : ""}
          onClick={() => setActiveTab("scan")}
        >
          SCAN
        </h3>
        <h3
          className={activeTab === "tested" ? "active" : ""}
          onClick={() => setActiveTab("tested")}
        >
          WHAT WAS TESTED
        </h3>
      </div>
      <div className="tab-content">
        {activeTab === "scan" && scanData && (
          <div className="tab-section active">
            <PieChart scanData={scanData} />
          </div>
        )}
        {activeTab === "tested" && (
          <div className="tab-section active">
            <div className="test-section-buttons">
              <div
                className={
                  activeTestSection === "automated"
                    ? "summary-test-btn current"
                    : "summary-test-btn"
                }
                onClick={() => setActiveTestSection("automated")}
              >
                Automated
              </div>
              <div
                className={
                  activeTestSection === "to_review"
                    ? "summary-test-btn current"
                    : "summary-test-btn"
                }
                onClick={() => setActiveTestSection("to_review")}
              >
                To Review
              </div>
              <div
                className={
                  activeTestSection === "manual"
                    ? "summary-test-btn current"
                    : "summary-test-btn"
                }
                onClick={() => setActiveTestSection("manual")}
              >
                Manual
              </div>
            </div>
            {renderTestSection()}
          </div>
        )}
      </div>
    </div>
  );
}
