import { cn } from "../../../functions/setStyles";
import QuestionTile from "../QuestionTile/QuestionTile";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ category, onTileClick }) => {
  return (
    <div className={cn(styles, `container`)}>
      <div className={cn(styles, `title`, `tile`)}>{category.name}</div>
      <div className={styles.list}>
        {category.questions.map((q, index) => (
          <QuestionTile
            key={index}
            value={q.value}
            answered={q.answered}
            onClick={() => onTileClick(index)} // Pass question index
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryColumn;
