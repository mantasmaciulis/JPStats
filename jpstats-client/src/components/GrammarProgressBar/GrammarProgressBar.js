import React from "react";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './GrammarProgressBar.css'
function GrammarProgressBar({jlptlevel, backgroundColor, trailColor, percentComplete}) {
    return(
    <div  className="grammar-progress-bar">
    <CircularProgressbarWithChildren value={percentComplete} strokeWidth={12} background={true}
    styles={buildStyles({
        strokeLinecap: 'butt',    
        pathColor: trailColor,
        trailColor: '#BBB6B6',
        backgroundColor: backgroundColor,
      })}
    
    >
    <div className="jlpt-level">{jlptlevel}</div>
    <div className="jlpt-progress">{percentComplete}%</div>

    </CircularProgressbarWithChildren>
    </div>    );
}

export default GrammarProgressBar