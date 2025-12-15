import { useState } from "react";
import { cn } from "../../../functions/setStyles";
import styles from "./AdminPanel.module.css";


const AdminPanel = () => {


  return (
    <div className={cn(styles, ``, "container")}>
      <header>
        <h1> Questions & Categories </h1>
      </header>
      <main className={cn(styles, `admin-main`)}>
        {/* Temporary manual setup. It's supposed to generate a column per category from API. */}
        <h2 className={cn(styles, `heading`)}>
          Toggle between managing Questions & Categories
        </h2>
        <div className={cn(styles, `radio-inputs`)}>
          <label className={cn(styles, `radio`)}>
            <input name="radio" type="radio" />
            <span className={cn(styles, `name`)}>Questions</span>
          </label>
          <label className={cn(styles, `radio`)}>
            <input name="radio" type="radio" />
            <span className={cn(styles, `name`)}>Categories</span>
          </label>
        </div>

        <table className={cn(styles, `Zebra-table`)}>
          <tr className={cn(styles, `category-table-header`)}>
            <th className={cn(styles, `Question-tag`)}>Question</th>
            <th className={cn(styles, `Category`)}>Category</th>
            <th className={cn(styles, `Status-tag`)}>Status</th>
          </tr>
          <tr>
            <th className={cn(styles, `Question`)}>
              Why is Christmas red? <p>Coca Cola</p>{" "}
            </th>
            <button className={cn(styles, `button-question`)}>Question</button>
            <th className={cn(styles, `button-status`)}>Published</th>
          </tr>
        </table>
      </main>
    </div>
  );
};

export default AdminPanel;
