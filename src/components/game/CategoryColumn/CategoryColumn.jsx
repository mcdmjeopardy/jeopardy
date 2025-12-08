import { cn } from "../../../functions/setStyles";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ gs = "" }) => {
  return (
    <div className={cn(styles, `module1 module2`, `${gs} global1 global2`)}>
      CategoryColumn
    </div>
  );
};

export default CategoryColumn;
