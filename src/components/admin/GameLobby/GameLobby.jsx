import {
  AddCircleIcon,
  CircleArrowRight01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import icebear from "../../../assets/icebear.jpg";
import julemandven from "../../../assets/julemand-ven.jpg";
import juletræ from "../../../assets/juletræ.jpg";
import julmand from "../../../assets/julmand.jpg";
import lobby from "../../../assets/videos/Lobby.mp4";
import { cn } from "../../../functions/setStyles";
import styles from "./GameLobby.module.css";

const GameLobby = () => {
  return (
    <>
      <video
        className={cn(styles, `backgroundvideo`)}
        preload="auto"
        autoPlay
        loop
        muted
      >
        <source src={lobby} type="video/mp4" />
      </video>
      <footer className={cn(styles, ``, "footer")}>
        <div className={cn(styles, `container`, "")}>
          <div className={cn(styles, `teams`, "")}>
            <div className={cn(styles, `teamcard`)}>
              <button className={cn(styles, `setting-icon`)}>
                {" "}
                <HugeiconsIcon
                  icon={Settings02Icon}
                  size={22}
                  color="#ffffff"
                  strokeWidth={1.5}
                />
              </button>
              <img src={juletræ} className={cn(styles, `avatar`)}></img>
              <div className={cn(styles, `names`)}>
                {" "}
                <h3>Team Gingerbread</h3>
              </div>
            </div>
            <div className={cn(styles, `teamcard`)}>
              <button className={cn(styles, `setting-icon`)}>
                {" "}
                <HugeiconsIcon
                  icon={Settings02Icon}
                  size={22}
                  color="#ffffff"
                  strokeWidth={1.5}
                />
              </button>
              <img src={julmand} className={cn(styles, `avatar`)}></img>

              <div className={cn(styles, `icon`)}>
                <div className={cn(styles, `icon`)}></div>
              </div>
              <div className={cn(styles, `names`)}>
                {" "}
                <h3>Team 2</h3>
              </div>
            </div>
            <div className={cn(styles, `teamcard`)}>
              <button className={cn(styles, `setting-icon`)}>
                {" "}
                <HugeiconsIcon
                  icon={Settings02Icon}
                  size={22}
                  color="#ffffff"
                  strokeWidth={1.5}
                />
              </button>
              <img src={icebear} className={cn(styles, `avatar`)}></img>
              <div className={cn(styles, `names`)}>
                <h3>Team 3</h3>
              </div>
            </div>
            <div className={cn(styles, `teamcard`)}>
              <button className={cn(styles, `setting-icon`)}>
                {" "}
                <HugeiconsIcon
                  icon={Settings02Icon}
                  size={22}
                  color="#ffffff"
                  strokeWidth={1.5}
                />
              </button>
              <img src={julemandven} className={cn(styles, `avatar`)}></img>
              <div className={cn(styles, `Cryingicon`)}></div>
              <div className={cn(styles, `names`)}>
                <h3>Team 4</h3>
              </div>
            </div>
            <button className={cn(styles, `startbutton`)}>
              {" "}
              <HugeiconsIcon
                icon={AddCircleIcon}
                size={50}
                color="#ffffff"
                strokeWidth={1.5}
              />
            </button>
          </div>
          <button className={cn(styles, `startbutton`)}>
            START GAME{" "}
            <HugeiconsIcon
              icon={CircleArrowRight01Icon}
              size={50}
              color="#ffffff"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </footer>
    </>
  );
};

export default GameLobby;
