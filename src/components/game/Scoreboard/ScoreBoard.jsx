import { cn } from "../../../functions/setStyles";
import julmand from "../../../assets/julmand.jpg";
import icebear from "../../../assets/icebear.jpg";
import julemandven from "../../../assets/julemand-ven.jpg";
import juletræ from "../../../assets/juletræ.jpg";
import styles from "./ScoreBoard.module.css";
import { HugeiconsIcon } from "@hugeicons/react";
import { MedalFirstPlaceIcon } from "@hugeicons/core-free-icons";
import { MedalSecondPlaceIcon } from "@hugeicons/core-free-icons";
import { MedalThirdPlaceIcon } from "@hugeicons/core-free-icons";
import { CryingIcon } from "@hugeicons/core-free-icons";
import Button from "../../common/Button/Button";

const ScoreBoard = ({ ms }) => {
  return (
    <div className={cn(styles, `${ms} container`)}>
      <div className={cn(styles, `teamcard`)}>
        <img src={juletræ} className={cn(styles, `avatar`)}></img>
        <div className={cn(styles, `icon`)}>
          <HugeiconsIcon
            icon={MedalFirstPlaceIcon}
            size={40}
            color="#f0c435"
            strokeWidth={1.5}
          />
        </div>
        <div className={cn(styles, `names`)}>
          {" "}
          <h3>Team 1</h3>{" "}
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>

        <button className={styles.button}>TEST</button>
      </div>

      <div className={cn(styles, `teamcard`)}>
        <img src={julmand} className={cn(styles, `avatar`)}></img>
        <div className={cn(styles, `icon`)}>
          <div className={cn(styles, `icon`)}>
            <HugeiconsIcon
              icon={MedalSecondPlaceIcon}
              size={40}
              color="#bababaff"
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className={cn(styles, `names`)}>
          {" "}
          <h3>Team 2</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>

        <button className={styles.button}>TEST</button>
      </div>

      <div className={cn(styles, `teamcard`)}>
        <img src={icebear} className={cn(styles, `avatar`)}></img>
        <div className={cn(styles, `icon`)}>
          <HugeiconsIcon
            icon={MedalThirdPlaceIcon}
            size={40}
            color="#cc7d16ff"
            strokeWidth={1.5}
          />
        </div>
        <div className={cn(styles, `names`)}>
          <h3>Team 3</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>

        <button className={styles.button}>TEST</button>
      </div>

      <div className={cn(styles, `teamcard`)}>
        <img src={julemandven} className={cn(styles, `avatar`)}></img>
        <div className={cn(styles, `Cryingicon`)}>
          <HugeiconsIcon
            icon={CryingIcon}
            size={24}
            color="#fa0a1a"
            strokeWidth={1.5}
          />
        </div>
        <div className={cn(styles, `names`)}>
          <h3>Team 4</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>

        <button className={styles.button}>TEST</button>
      </div>
    </div>
  );
};

export default ScoreBoard;
