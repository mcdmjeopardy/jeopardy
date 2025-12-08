import React from "react";
import styles from "./GameLobby.module.css";
import { cn } from "../../../functions/setStyles";

const GameLobby = () => {
  return <div className={cn(styles, `container`)}>GameLobby</div>;
};

export default GameLobby;
