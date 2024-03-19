import React from 'react';
import './VocabCount.css';

const VocabCount = ({ bgColor, lvColor, level, vocabCount }) => {
  return (
    <div className="vocab-count-container" style={{ backgroundColor: bgColor }}>
      <div className="level" style={{ color: lvColor }}>Level {level}</div>
      <div className="count">{vocabCount}</div>
    </div>
  );
};

export default VocabCount;
