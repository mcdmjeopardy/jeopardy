import { cn } from "../../../functions/setStyles";
import styles from "./QuestionTile.module.css";

const QuestionTile = ({ value, answered, onClick }) => {
  if (answered) {
    return <div className={cn(styles, `container tilebg used`, `tile`)}>{value}</div>;
  }

  return (
    <div
      className={cn(styles, `container tilebg`, `tile`)}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default QuestionTile;
