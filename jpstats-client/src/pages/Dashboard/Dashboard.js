import React, { useEffect, useState, useMemo } from 'react';
import Card from "../../components/Card/Card";
import JLPTCard from "../../components/JLPTCard/JLPTCard";
import RecentStatsGraph from "../../components/RecentStatsGraph/RecentStatsGraph";
import VocabCount from "../../components/VocabCount/VocabCount";
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
  }, [fetchFunc, key, defaultValue]);

  return data;
};

const Dashboard = () => {
  const colors = [
    { bgColor: "#6BB895", lvColor: "#569478" },
    { bgColor: "#9DDAD5", lvColor: "#8BBEBA" },
    { bgColor: "#8ED9F5", lvColor: "#75B8D0" },
    { bgColor: "#8DBEF9", lvColor: "#7BA6DB" },
    { bgColor: "#55A6DA", lvColor: "#4D97C7" },
    { bgColor: "#C37AE1", lvColor: "#AE6EC8" },
    { bgColor: "#ED67A7", lvColor: "#DB609B" }
  ];

  const streak = useFetchAndCache('streak', getStreak, 0);
  const daysStudied = useFetchAndCache('days-studied', getDaysStudiesCount, 0);
  const recentlyLearnedData = useFetchAndCache('recently-learned', getRecentlyLearnedCounts, [0,0,0,0,0,0,0]);
  const consistency = useFetchAndCache('consistency', getConsistency, 0);
  const totalVocab = useFetchAndCache('total-vocab', getTotalVocab, 0);
  const vocabByLevel = useFetchAndCache('vocab-by-level', getCountsByLevel, []);

  const data = {
    datasets: [
      {
        label: "New words",
        data: recentlyLearnedData,
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

      <Card className="recently-learned" title="Recently Learned Words">
        <RecentStatsGraph
          className="grid-item-align-bottom"
          graphData={data}
        ></RecentStatsGraph>
      </Card>

      <Card className="words-by-memory" title="Words By Memory Level">
        <div className="memory-cards">
          {vocabByLevel.slice(2).map((level, index) => (
            <VocabCount
              key={index}
              bgColor={colors[index % colors.length].bgColor}
              lvColor={colors[index % colors.length].lvColor}
              level={level._id}
              vocabCount={level.count}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;