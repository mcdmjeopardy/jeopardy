import { cn } from "../../../functions/setStyles";
import QuestionTile from "../QuestionTile/QuestionTile";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = () => {
  return (
    <div className={cn(styles, `container`)}>
      <h2 className={styles.title}>title</h2>
      <ul className={styles.list}>
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
