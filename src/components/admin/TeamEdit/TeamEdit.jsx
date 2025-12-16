import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTeams } from "../../../context/TeamsContext";

import { AVAILABLE_AVATARS, AVATAR_MAP } from "../../../utils/avatarMap";
import Button from "../../common/Button/Button";
import styles from "./TeamEdit.module.css";

export default function TeamEdit({ onClose, onSave }) {
  const { currentTeam, updateTeam, createTeam, deleteTeam } = useTeams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!currentTeam || currentTeam.isNew) return;

    if (window.confirm("Are you sure you want to delete this team? This cannot be undone.")) {
      await deleteTeam(currentTeam._id);
      onClose(); // Close modal after delete
    }
  };

  const [name, setName] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(AVAILABLE_AVATARS[0].id);

  useEffect(() => {
    if (currentTeam) {
      setName(currentTeam.name);
      // Map seed avatar names (e.g. "fairybread") to our local images if needed,
      // or just use what we have.
      // Seed uses: "fairybread" (juletræ), "gingerbread" (julmand), "rudolf" (icebear), "snowman" (julemandven)
      let initialId = currentTeam.avatar;

      // Fix seed mismatches for the UI
      if (initialId === "fairybread") initialId = "juletræ";
      if (initialId === "gingerbread") initialId = "julmand";
      if (initialId === "rudolf") initialId = "icebear";
      if (initialId === "snowman") initialId = "julemandven";

      setSelectedAvatarId(initialId);
    }
  }, [currentTeam]);

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

    if (currentTeam.isNew) {
         const newTeamData = {
            name: name,
            avatar: selectedAvatarId,
            image: "https://jeopardy-gkiyb.ondigitalocean.app/teams/team1.png", // Default image for API
            score: 0
         };
         savedTeam = await createTeam(newTeamData);
    } else {
         await updateTeam(currentTeam._id, {
            name: name,
            avatar: selectedAvatarId
         });
         savedTeam = { ...currentTeam, name, avatar: selectedAvatarId };
    }

    if (onSave && savedTeam) {
        onSave(savedTeam);
    } else {
        onClose();
    }
  };

  const currentAvatarSrc = AVATAR_MAP[selectedAvatarId] || AVATAR_MAP.default;

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
              {AVAILABLE_AVATARS.map((a) => (
                <img
                  key={a.id}
                  src={a.src}
                  className={`${styles.smallAvatar} ${
                    selectedAvatarId === a.id ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedAvatarId(a.id)}
                  alt={a.id}
                />
              ))}
            </div>

            <Button ms="saveBtn" content={"SAVE"} func={handleSave} />

            {/* DELETE Button - only show for existing teams */}
            {!currentTeam?.isNew && (
              <button
                className={styles.deleteBtn}
                onClick={handleDelete}
                style={{ marginTop: "1rem", backgroundColor: "#ff4444", color: "white", padding: "10px", borderRadius: "8px", border: "none", cursor: "pointer", width: "100%", fontWeight: "bold" }}
              >
                DELETE TEAM
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
