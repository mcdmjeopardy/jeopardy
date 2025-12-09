import { cn } from "../../../functions/setStyles";
import QuestionTile from "../QuestionTile/QuestionTile";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ title }) => {
  return (
    <div className={cn(styles, `container`)}>
      <div className={cn(styles, `title`, `tile`)}>{title}</div>
      <ul className={styles.list}>
        <li>
          <QuestionTile />
        </li>
        <li>
          <QuestionTile />
        </li>
        <li>
          <QuestionTile />
        </li>
        <li>
          <QuestionTile />
        </li>
        <li>
          <QuestionTile />
        </li>
      </ul>
    </div>
  );
};

export default CategoryColumn;
