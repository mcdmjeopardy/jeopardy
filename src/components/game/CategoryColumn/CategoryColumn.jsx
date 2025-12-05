import { cx } from "../../../functions/setStyles";
import styles from "./CategoryColumn.module.css";

const CategoryColumn = ({ gs }) => {
  console.log(gs);
  return (
    <div className={cx(styles, `module1 module2`, `${gs} global1 global2`)}>
      CategoryColumn
    </div>
  );
};

export default CategoryColumn;
