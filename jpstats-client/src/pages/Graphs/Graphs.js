import React, { useEffect, useState } from "react";
import "./Graphs.css";
import VocabOverTime from "../../components/AllGraphs/VocabOverTime/VocabOverTime";
import WeeklyNewVocab from "../../components/AllGraphs/WeeklyVocab/WeelyNewVocab";
import { getNewVocabOverTime, getNewVocabPerWeek } from "../../apiJPStats";
function Graphs() {
  const [newWordsDailyCummData, setCummData] = useState([]);
  const [weeklyNewWordsData, setWeeklyData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await getNewVocabOverTime();
              const formattedData = result.map(item => [
                  new Date(item.date).getTime(),
                  item["Total Words Known"]
              ]);
              setCummData(formattedData);
          } catch (error) {
              console.error('Error fetching new vocab over time:', error);
          }
      };

      fetchData();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await getNewVocabPerWeek();
              const formattedData = result.map(item => [new Date(item.date).getTime(), item.value]);
              setWeeklyData(formattedData);
          } catch (error) {
              console.error('Error fetching new vocab over time:', error);
          }
      };

      fetchData();
  }, []);

  return (
   <div>
<VocabOverTime data={newWordsDailyCummData}></VocabOverTime>
<WeeklyNewVocab data={weeklyNewWordsData}></WeeklyNewVocab>
  </div>
  );
}

export default Graphs;
