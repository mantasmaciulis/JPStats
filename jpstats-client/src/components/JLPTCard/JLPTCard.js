import React from "react";
import "./JLPTCard.css";
import Card from "../Card/Card";
import ProgressBar from "@ramonak/react-progress-bar";
function JLPTCard({ title, percentage, vocab, days, streak, consistency }) {
  return (
    <Card className="progress-to-jlpt" title={title} percentage={percentage}>
      <ProgressBar
        completed={percentage}
        bgColor="#FF6152"
        baseBgColor="#D9D9D9"
        isLabelVisible={false}
        height="12px"
        width="100%"
      />
      <hr className="divider" />
      <div className="center-wrapper">
        <div className="stats-container">
          <div className="stat-item">
            <h2>Total Vocab</h2>
            <p>{vocab}</p>
          </div>
          <div className="stat-item">
            <h2>Days Studied</h2>
            <p>{days}</p>
          </div>
          <div className="stat-item">
            <h2>Streak</h2>
            <p>{streak}</p>
          </div>
          <div className="stat-item">
            <h2>Consistency</h2>
            <p>{consistency}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
export default JLPTCard;
