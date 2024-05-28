import { useState } from "react";
import { database, ref, update } from "../../firebaseConfig";
import Button from "../Button/Button";
import "./SidePanelDetails.css";
import save from "../../assets/save.svg";

export default function SidePanelDetails({
  scanData: initialScanData,
  scanId,
}) {
  const [scanData, setScanData] = useState(initialScanData);
  const [newTag, setNewTag] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, ".");
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  const renderTags = (tags) => {
    return tags.map((tag, index) => <div key={index}>+ {tag}</div>);
  };

  const handleInputChange = (event) => {
    setNewTag(event.target.value);
  };

  const handleAddTag = async () => {
    if (newTag.trim() === "") return;

    const updatedTags = [...(scanData.details.tags || []), newTag.trim()];
    const updatedScanData = {
      ...scanData,
      details: {
        ...scanData.details,
        tags: updatedTags,
      },
    };

    const dbRef = ref(database, `scans/${scanId}/details`);
    await update(dbRef, { tags: updatedTags });

    setScanData(updatedScanData);
    setNewTag("");
  };

  return (
    <div className="side-panel details">
      <div>
        <h2>{scanData.details.page_name}</h2>
        <h3>
          Date:{" "}
          <span className="normal">{formatDate(scanData.details.date)}</span>
        </h3>
        <h3>
          Software: <span className="normal">{scanData.details.os}</span>
        </h3>
        <h3>Tags:</h3>
        {scanData.details.tags && renderTags(scanData.details.tags)}
      </div>
      <div>
        <h3>Notes</h3>
        <div className="notes"></div>
      </div>
    </div>
  );
}
