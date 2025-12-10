import { cn } from "../../../functions/setStyles";
import QuestionTile from "../QuestionTile/QuestionTile";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ title, onTileClick }) => {
  return (
    <div className={cn(styles, `container`)}>
      <div className={cn(styles, `title`, `tile`)}>{title}</div>
      <div className={styles.list}>
        {/* generate question tiles */}
        <QuestionTile onTileClick={onTileClick} />
        <QuestionTile onTileClick={onTileClick} />
        <QuestionTile onTileClick={onTileClick} />
        <QuestionTile onTileClick={onTileClick} />
        <QuestionTile onTileClick={onTileClick} />
      </div>
    </div>
  );
};

export default CategoryColumn;
