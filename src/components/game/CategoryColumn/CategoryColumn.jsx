import { cn } from "../../../functions/setStyles";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ ms, gs }) => {
  return (
    <div
      className={cn(styles, `${ms} module1 module2`, `${gs} global1 global2`)}
    >
      CategoryColumn
    </div>
  );
};

export default CategoryColumn;
