import React from "react";
import "./Card.css";

const Card = ({ className, title, percentage, children }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        {title && <div className="card-title">{title}</div>}
        <div className="card-percentage">
          {percentage !== undefined ? `${percentage}%` : ""}
        </div>
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
