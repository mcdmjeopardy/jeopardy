import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import freework from "../../../../assets/free-work.jpg";
import icebear from "../../../../assets/icebear.jpg";
import julemandven from "../../../../assets/julemand-ven.jpg";
import juletræ from "../../../../assets/juletræ.jpg";

import mai from "../../../../assets/mai.jpg";
import penguin from "../../../../assets/penguin.jpg";
import rasmus from "../../../../assets/rasmus.jpg";
import star from "../../../../assets/star.jpg";
import wolf from "../../../../assets/wolf.jpg";
import julmand from "../../../../assets/julmand.jpg";
import Button from "../../../common/Button/Button";

export default function EditProfile() {
  const testFunc = () => {
    console.log("TEEEEST!");
  };

  const avatars = [
    freework,
    icebear,
    julemandven,
    juletræ,
    julmand,
    mai,
    penguin,
    rasmus,
    star,
    wolf,
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>EDIT PARTICIPANT PROFILE</h2>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <img src={selectedAvatar} className={styles.bigAvatar} />
            <p className={styles.teamName}>Team GingerBread 🎄</p>
          </div>

          <div className={styles.right}>
            <div className={styles.avatarGrid}>
              {avatars.map((a, i) => (
                <img
                  key={i}
                  src={a}
                  className={`${styles.smallAvatar} ${
                    selectedAvatar === a ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedAvatar(a)}
                />
              ))}
            </div>

            <Button ms="saveBtn" content={"SAVE"} func={testFunc} />
          </div>
        </div>
      </div>
    </div>
  );
}
