import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeams } from "../../../context/TeamsContext";

import Button from "../../common/Button/Button";
import styles from "./TeamEdit.module.css";

export default function TeamEdit({ onClose, onSave }) {
  const { currentTeam, updateTeam, createTeam, deleteTeam, teamImages, getAvatarUrl } = useTeams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!currentTeam || currentTeam.isNew) return;

    if (window.confirm("Are you sure you want to delete this team? This cannot be undone.")) {
      await deleteTeam(currentTeam._id);
      onClose(); // Close modal after delete
    }
  };

  const [name, setName] = useState("");
  // Initialize with first image if available, otherwise empty
  const [selectedAvatarId, setSelectedAvatarId] = useState(teamImages[0]?.id || "");

  useEffect(() => {
    if (currentTeam) {
      setName(currentTeam.name);

      // If the team has an avatar ID, select it.
      if (currentTeam.avatar) {
          setSelectedAvatarId(currentTeam.avatar);
      } else if (currentTeam.image) {
          // If no ID but has image URL, try to find matching image
          const matchingImg = teamImages.find(img => img.url === currentTeam.image);
          if (matchingImg) {
              setSelectedAvatarId(matchingImg.id);
          }
      }
    } else if (teamImages.length > 0 && !selectedAvatarId) {
        // If creating new team and images just loaded
        setSelectedAvatarId(teamImages[0].id);
    }
  }, [currentTeam, teamImages]);

  // Ensure we have a selection once images define or if previous selection was invalid
  useEffect(() => {
    if (!selectedAvatarId && teamImages.length > 0) {
      setSelectedAvatarId(teamImages[0].id);
    }
  }, [teamImages, selectedAvatarId]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const handleSave = async () => {
    if (!currentTeam) return;

    if (!name.trim()) {
       alert("Name cannot be empty");
       return;
    }

    let savedTeam = null;
    const imageUrl = getAvatarUrl(selectedAvatarId);

    if (currentTeam.isNew) {
         const newTeamData = {
            name: name,
            avatar: selectedAvatarId,
            image: imageUrl,
            score: 0
         };
         savedTeam = await createTeam(newTeamData);
    } else {
         await updateTeam(currentTeam._id, {
            name: name,
            avatar: selectedAvatarId,
            image: imageUrl
         });
         savedTeam = { ...currentTeam, name, avatar: selectedAvatarId, image: imageUrl };
    }

    if (onSave && savedTeam) {
        onSave(savedTeam);
    } else {
        onClose();
    }
  };

  const currentAvatarSrc = getAvatarUrl(selectedAvatarId);

  return (
    <div className={styles.modalBackground} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>EDIT PARTICIPANT PROFILE</h2>
          <button className={styles.closeBtn} onClick={handleClose}>X</button>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <img src={currentAvatarSrc} className={styles.bigAvatar} alt="Selected" />

            {/* Editable name input */}
            <input
                type="text"
                className={styles.nameInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.right}>
            <div className={styles.avatarGrid}>
              {teamImages.map((a) => (
                <img
                  key={a.id}
                  src={a.url}
                  className={`${styles.smallAvatar} ${
                    selectedAvatarId === a.id ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedAvatarId(a.id)}
                  alt={a.label || a.id}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button ms="saveBtn" content={"SAVE"} func={handleSave} />

              {/* DELETE Button - only show for existing teams */}
              {!currentTeam?.isNew && (
                <button
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                  style={{ backgroundColor: "#ff4444", color: "white", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold" }}
                >
                  DELETE TEAM
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
