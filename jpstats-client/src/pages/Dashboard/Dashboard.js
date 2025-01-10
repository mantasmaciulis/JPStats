import React, { useEffect, useState, useMemo } from 'react';
import Card from "../../components/Card/Card";
import JLPTCard from "../../components/JLPTCard/JLPTCard";
import RecentStatsGraph from "../../components/RecentStatsGraph/RecentStatsGraph";
import MemoryLevelsGraph from '../../components/MemoryLevelsGraph/MemoryLevelsGraph';
import "./Dashboard.css";
import { 
  getStreak, 
  getDaysStudiesCount, 
  getRecentlyLearnedCounts, 
  getConsistency, 
  getTotalVocab, 
  getCountsByLevel 
} from '../../apiJPStats';

// Custom hook for fetching and caching data
const useFetchAndCache = (key, fetchFunc, defaultValue) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(key);
    return savedData && savedData !== "undefined" ? JSON.parse(savedData) : defaultValue;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunc();
        localStorage.setItem(key, JSON.stringify(result));
        setData(result || defaultValue);
      } catch (error) {
        console.error(`Failed to fetch ${key}:`, error);
        setData(defaultValue);
      }
    };
    fetchData();
  }, []);

  return data;
};

const Dashboard = () => {
  const streak = useFetchAndCache('streak', getStreak, 0);
  const daysStudied = useFetchAndCache('days-studied', getDaysStudiesCount, 0);
  const recentlyLearnedData = useFetchAndCache('recently-learned', getRecentlyLearnedCounts, [0,0,0,0,0,0,0]);
  const consistency = useFetchAndCache('consistency', getConsistency, 0);
  const totalVocab = useFetchAndCache('total-vocab', getTotalVocab, 0);
  const vocabByLevel = useFetchAndCache('vocab-by-level', getCountsByLevel, [0,0,0,0,0,0,0,0]);

  const recently_studied_data = {
    datasets: [
      {
        label: "New words",
        data: recentlyLearnedData,
        backgroundColor: "rgba(208, 76, 76, 0.85)",
        borderColor: "rgb(0,0,0)",
      },
    ],
  };

  const memory_levels_data = {
    datasets: [
      {
        label: "Vocabulary count",
        data: vocabByLevel,
        backgroundColor: "rgba(208, 76, 76, 0.85)",
        borderColor: "rgb(0,0,0)",
      },
    ],
  };

  const percentage = (totalVocab / 10000) * 100

  return (
    <div className="dashboard">
      <JLPTCard
        title="Progress to JLPT N1"
        percentage={percentage.toFixed(0)}
        vocab={totalVocab}
        days={daysStudied}
        streak={streak}
        consistency={consistency}
      />

      <Card className="recently-learned" title="New Vocab Learned This Week">
        <RecentStatsGraph
          className="grid-item-align-bottom"
          graphData={recently_studied_data}
        ></RecentStatsGraph>
      </Card>

      <Card className="vocab-per-srs" title="Vocabulary Count per SRS Stage">
        <MemoryLevelsGraph
          className="grid-item-align-bottom"
          graphData={memory_levels_data}
        ></MemoryLevelsGraph>
      </Card>
    </div>
  );
};

export default Dashboard;