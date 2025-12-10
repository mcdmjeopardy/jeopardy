import { cn } from "../../../functions/setStyles";
import julmand from "../../../assets/julmand.jpg";
import styles from "./ScoreBoard.module.css";

const ScoreBoard = () => {
  return (
    <div className={cn(styles, `container`, "")}>
      <div className={cn(styles, `teamcard`)}>
        <div className={cn(styles, `names`)}>
          {" "}
          <h3>Team 1</h3>{" "}
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>
      </div>
      <div className={cn(styles, `teamcard`)}>
        <img src={julmand} className={cn(styles, `avatar`)}></img>
        <div className={cn(styles, `names`)}>
          {" "}
          <h3>Team 2</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>
      </div>
      <div className={cn(styles, `teamcard`)}>
        <div className={cn(styles, `names`)}>
          <h3>Team 3</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>
      </div>
      <div className={cn(styles, `teamcard`)}>
        <div className={cn(styles, `names`)}>
          <h3>Team 4</h3>
        </div>
        <div className={cn(styles, `score`)}>
          <h3>0</h3>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
