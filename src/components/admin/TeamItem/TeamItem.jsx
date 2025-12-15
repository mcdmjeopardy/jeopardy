import React from "react";

export default function TeamItem({ team, toggleTeam }) {
  return (
    <li>
      <button
        onClick={() => toggleTeam(team.id)}
        className={`team-button ${team.active ? "active" : "inactive"}`}
      >
        <img src={team.icon} alt="" />
        <span>{team.name}</span>
        <span>{team.active ? "Aktiv" : "Inaktiv"}</span>
      </button>
    </li>
  );
}
