import React, { useEffect, useState, useMemo } from "react";
import { database, ref, get } from "../../firebaseConfig.js";
import ScanDetails from "./ScanDetails";
import "./ScanList.css";
import sort from "../../assets/sort.svg";
import arrow from "../../assets/arrow_down.svg";

const ScanList = () => {
  const [scans, setScans] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });

  useEffect(() => {
    const fetchScans = async () => {
      const dbRef = ref(database, "scans");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const scansObj = snapshot.val();
        const scansArray = Object.keys(scansObj).map((key) => ({
          id: key,
          data: scansObj[key],
        }));
        setScans(scansArray);
      }
    };

    fetchScans();
  }, []);

  const sortedScans = useMemo(() => {
    let sortableScans = [...scans];
    sortableScans.sort((a, b) => {
      const keyA = a.data.details[sortConfig.key];
      const keyB = b.data.details[sortConfig.key];

      if (sortConfig.key === "issueCount") {
        return sortConfig.direction === "ascending"
          ? a.data.criterias.issues.length - b.data.criterias.issues.length
          : b.data.criterias.issues.length - a.data.criterias.issues.length;
      }

      if (sortConfig.key === "toReviewCount") {
        return sortConfig.direction === "ascending"
          ? a.data.criterias.to_review.length -
              b.data.criterias.to_review.length
          : b.data.criterias.to_review.length -
              a.data.criterias.to_review.length;
      }

      if (keyA < keyB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (keyA > keyB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortableScans;
  }, [scans, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr className="blue-row line-border">
          <th colSpan="7">{scans.length} total scans</th>
        </tr>
        <tr className="blue-row">
          <th onClick={() => requestSort("date")}>
            <div className="table-header">
              <span>Date</span>
              <img src={sort} alt="Sort" />
            </div>
          </th>
          <th onClick={() => requestSort("os")}>
            <div className="table-header">
              <span>OS</span>
              <img src={sort} alt="Sort" />
            </div>
          </th>
          <th onClick={() => requestSort("issueCount")}>
            <div className="table-header">
              <span>Issues</span>
              <img src={sort} alt="Sort" />
            </div>
          </th>
          <th onClick={() => requestSort("toReviewCount")}>
            <div className="table-header smaller">
              <span>To review</span>
              <img src={sort} alt="Sort" />
            </div>
          </th>
          <th onClick={() => requestSort("user")}>
            <div className="table-header">
              <span>User</span>
              <img src={sort} alt="Sort" />
            </div>
          </th>
          <th>
            <div className="table-header">
              <span>Tags</span>
              <img src={arrow} alt="Filter" />
            </div>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedScans.map((scan, index) => (
          <ScanDetails
            key={scan.id}
            scan={scan}
            index={index}
            scans={scans}
            setScans={setScans}
            onClick={() => onScanClick(scan)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ScanList;
