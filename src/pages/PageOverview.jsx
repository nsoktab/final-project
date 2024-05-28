import Navigation from "../components/Navigation/Navigation";
import "./PageOverview.css";
import ScanList from "../components/ScanList/ScanList";
import SidePanel from "../components/SidePanel/SidePanel";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";

export default function PageOverview() {
  const [breadcrumbPaths, setBreadcrumbPaths] = useState([
    { name: "The Weather App", url: "/" },
    { name: "Home Page", url: "/overview" },
  ]);

  const handleScanClick = (scan) => {
    setBreadcrumbPaths([
      { name: "The Weather App", url: "/" },
      { name: "Home Page", url: "/overview" },
      {
        name: `Scan from ${scan.data.details.date}`,
        url: `/scan/${scan.id}`,
      },
    ]);
  };

  return (
    <>
      <Navigation />
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="page-overview-content">
        <SidePanel />
        <div className="list-content">
          <ScanList onScanClick={handleScanClick} />
        </div>
      </div>
    </>
  );
}
