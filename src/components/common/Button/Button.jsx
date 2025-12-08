import { useNavigate } from "react-router-dom";
import { cn } from "../../../functions/setStyles.jsx";
import styles from "./Button.module.css";

const Button = ({ mStyles, gStyles, content, link, func }) => {
  const navigate = useNavigate();
  const clickEvent = () => {
    // If link was given, use navigate for "/" links, or window open otherwise.
    if (link) {
      if (link[0] == "/") {
        navigate(link);
      } else {
        window.open(link, "_blank");
      }
      return;
    }
    // If no link was given, check for function and run it if given.
    if (typeof func === "function") {
      func();
      return;
    }
    // If neither link nor function was given, give console warning.
    console.warn("Button has no link or function.");
  };

  return (
    <button className={cn(styles, mStyles, gStyles)} onClick={clickEvent}>
      {content}
    </button>
  );
};

export default Button;
