import React from "react";

export default function InfoCard({ topic, setTopic, participantsCount }) {
  return (
    <div className="info-card">
      <div className="info-row">
        <span className="info-label">TOPIC:</span>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="topic-input"
        />
      </div>
      <div className="info-row">
        <span className="info-label">PARTICIPANTS:</span>
        <span className="info-value">
          {participantsCount} {participantsCount === 1 ? "TEAM" : "TEAMS"}
        </span>
      </div>
    </div>
  );
}
