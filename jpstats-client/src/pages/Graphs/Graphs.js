import React, { useEffect, useState } from "react";
import "./Graphs.css";
import VocabOverTime from "../../components/AllGraphs/VocabOverTime/VocabOverTime";
import WeeklyNewVocab from "../../components/AllGraphs/WeeklyVocab/WeelyNewVocab";
import VocabByLevelArea from "../../components/AllGraphs/VocabaByLevelArea/VocabByLevelArea";
import Retention from "../../components/AllGraphs/Retention/Retention";
import { getNewVocabOverTime, getNewVocabPerWeek, getRetentionRates, getVocabHistoryByMemoryLevel } from "../../apiJPStats";function Graphs() {
  const [newWordsDailyCummData, setCummData] = useState([]);
  const [weeklyNewWordsData, setWeeklyData] = useState([]);
  const [vocabHistoryData, setVocabHistoryData] = useState([]);
  const [retentionRates, setRetentionRates] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await getRetentionRates();
            setRetentionRates(result);
        } catch (error) {
            console.error('Error fetching new vocab over time:', error);
        }
    };

    fetchData();
}, []);


  const getColorByLevel = (level) => {
    const colors = {
      0: '#9f1fef',
      1: '#765eff',
      2: '#328aff',
      3: '#00abf8',
      4: '#00c3e0',
      5: '#00d8cb',
      6: '#00efa3',
      7: '#52ff00',
    };
    return colors[level] || '#ffffff';
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getVocabHistoryByMemoryLevel();
        const formattedData = result.levels.map(level => ({
          name: `Level ${level.level}`,
          data: level.data,
          color: getColorByLevel(level.level)
        }));
        setVocabHistoryData(formattedData);
      } catch (error) {
        console.error('Error fetching vocab history by memory level:', error);
      }
    };

    fetchData();
  }, []);

  return (
   <div>
<VocabOverTime data={newWordsDailyCummData}></VocabOverTime>
<WeeklyNewVocab data={weeklyNewWordsData}></WeeklyNewVocab>
<VocabByLevelArea data={vocabHistoryData} type={"area"} />
<VocabByLevelArea data={vocabHistoryData} type={"line"} />
<Retention data={retentionRates}></Retention>
  </div>
  );
}

export default Graphs;
