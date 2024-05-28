import React from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import { database, ref, set, remove } from "../../firebaseConfig.js";
import { useState } from "react";
import "./ScanList.css";
import appleLogo from "../../assets/apple.svg";
import androidLogo from "../../assets/android.svg";
import pencil from "../../assets/pencil.svg";
import trash from "../../assets/trash.svg";
import save from "../../assets/save.svg";

const ScanDetails = (props) => {
  //data to show in the table
  const { scan, index, scans, setScans } = props;
  const { date, os, user, tags } = scan.data.details;
  const { issues, to_review } = scan.data.criterias;

  //formate date and time
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");

  const formattedTime = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  //count issues and to review to show it in the table
  const issueCount = Object.values(issues).reduce(
    (total, issueList) => total + issueList.length,
    0
  );
  const toReviewCount = to_review.length;

  //edit the tags
  const [isEditing, setIsEditing] = useState(false);
  const [newTags, setNewTags] = useState(
    scan.data.details.tags ? scan.data.details.tags.join(", ") : ""
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleInputChange = (event) => {
    setNewTags(event.target.value);
  };

  const handleSaveClick = async () => {
    const updatedTags = newTags.split(",").map((tag) => tag.trim());
    const dbRef = ref(database, `scans/${scan.id}/details`);

    await set(dbRef, { ...scan.data.details, tags: updatedTags });
    setIsEditing(false);

    const updatedScans = scans.map((s) =>
      s.id === scan.id
        ? {
            ...s,
            data: {
              ...s.data,
              details: { ...s.data.details, tags: updatedTags },
            },
          }
        : s
    );
    setScans(updatedScans);
  };

  //delete the scan
  const [isModalOpen, setIsModalOpen] = useState(false); // Define isModalOpen state variable
  const [isDeleted, setIsDeleted] = useState(false); // State to manage deletion animation

  const handleDeleteClick = async () => {
    const dbRef = ref(database, `scans/${scan.id}`);
    await remove(dbRef);

    setIsDeleted(true);

    setTimeout(() => {
      const updatedScans = scans.filter((s) => s.id !== scan.id);
      setScans(updatedScans);
    }, 500);
  };

  const handleDeleteConfirmation = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleDeleteClick();
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className={`table-row-details ${isDeleted ? "deleted" : ""}`}>
        <td className="table-date">
          <Link to={`/scan/${scan.id}`} className="table-link">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </Link>
        </td>
        <td className="table-center-element">
          <Link to={`/scan/${scan.id}`} className="table-link">
            {os === "iOS" ? (
              <img src={appleLogo} alt="Apple Logo" className="os-logo" />
            ) : (
              <img src={androidLogo} alt="Android Logo" className="os-logo" />
            )}
          </Link>
        </td>

        <td className="table-center-element">
          <Link to={`/scan/${scan.id}`} className="table-link">
            {issueCount}
          </Link>
        </td>
        <td className="table-center-element">
          <Link to={`/scan/${scan.id}`} className="table-link">
            {toReviewCount}
          </Link>
        </td>
        <td>
          {" "}
          <Link to={`/scan/${scan.id}`} className="table-link">
            {user}
          </Link>
        </td>

        <td>
          {isEditing ? (
            <div className="tags-container">
              <input
                value={newTags}
                onChange={handleInputChange}
                className="edit-tags"
              />
              <img src={save} onClick={handleSaveClick} />
            </div>
          ) : (
            <div className="tags-container">
              <div>
                {tags && tags.length > 0
                  ? tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        <span className="tag">{tag}</span>
                        {index < tags.length - 1 && ", "}
                      </React.Fragment>
                    ))
                  : ""}
              </div>
              <img
                src={pencil}
                alt="Edit"
                onClick={handleEditClick}
                className="pencil"
              />
            </div>
          )}
        </td>
        <td>
          <img
            src={trash}
            alt="Delete the scan"
            onClick={handleDeleteConfirmation}
          />
        </td>
      </tr>
      <DeleteModal
        show={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
};

export default ScanDetails;
