import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { database, ref, get } from "../firebaseConfig";
import Navigation from "../components/Navigation/Navigation";
import "./ScanOverview.css";
import SidePanelDetails from "../components/SidePanelDetails/SidePanelDetails";
import SummaryTabs from "../components/Tabs/SummaryTabs";
import IssueTabs from "../components/Tabs/IssueTabs";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { formatDate } from "../utils";

export default function ScanOverview() {
  const { id } = useParams();

  const [scanData, setScanData] = useState(null);
  const [criteriaData, setCriteriaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const fetchScan = async () => {
      const dbRef = ref(database, `scans/${id}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setScanData(snapshot.val());
        // Fetch criteria data
        const criteriaRef = ref(database, "criterias");
        const criteriaSnapshot = await get(criteriaRef);
        if (criteriaSnapshot.exists()) {
          setCriteriaData(criteriaSnapshot.val());
        }
      }
      setIsLoading(false);
    };

    fetchScan();
  }, [id]);

  const breadcrumbPaths = [
    { name: "The Weather App", url: "/" },
    { name: "Home Page", url: "/overview" },
    {
      name: `Scan from ${scanData ? formatDate(scanData.details.date) : ""}`,
      url: `/scan/${id}`,
    },
  ];

  return (
    <>
      <Navigation />
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="scan-overview-content">
        {isLoading ? (
          "Loading..."
        ) : (
          <SidePanelDetails scanData={scanData} scanId={id} />
        )}
        <div className="tabs-section">
          <div className="section-headers">
            <h2
              className={activeSection === "summary" ? "active" : ""}
              onClick={() => setActiveSection("summary")}
            >
              SUMMARY
            </h2>
            <h2
              className={activeSection === "issues" ? "active" : ""}
              onClick={() => setActiveSection("issues")}
            >
              ISSUES
            </h2>
          </div>
          <div>
            {scanData &&
              criteriaData &&
              (activeSection === "summary" ? (
                <SummaryTabs scanData={scanData} criteriaData={criteriaData} />
              ) : (
                <IssueTabs scanData={scanData} criteriaData={criteriaData} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
