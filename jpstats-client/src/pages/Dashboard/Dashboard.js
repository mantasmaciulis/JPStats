import React, { useEffect, useState } from 'react';
import Card from "../../components/Card/Card";
import JLPTCard from "../../components/JLPTCard/JLPTCard";
import RecentStatsGraph from "../../components/RecentStatsGraph/RecentStatsGraph";
import VocabCount from "../../components/VocabCount/VocabCount";
import "./Dashboard.css";
import 'react-circular-progressbar/dist/styles.css';
import GrammarProgressBar from "../../components/GrammarProgressBar/GrammarProgressBar";
import { getStreak } from '../../apiJPStats';
export const data = {
  datasets: [
    {
      label: "New words",
      data: [100, 156, 120, 150, 43, 120, 90],
      backgroundColor: "rgba(208, 76, 76, 0.85)",
      borderColor: "rgb(0,0,0)",
    },
  ],
};
const Dashboard = () => {
  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('streak');
    return savedStreak ? JSON.parse(savedStreak) : 0;
  });

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const streakValue = await getStreak();
        localStorage.setItem('streak', JSON.stringify(streakValue));
        setStreak(streakValue || 0);
      } catch (error) {
        console.error('Failed to fetch streak:', error);
        setStreak(0); // Explicitly set streak to 0 on error
      }
    };

    fetchStreak();
  }, []);
  return (
    <div className="dashboard">
      
      <Card className="recently-learned" title="Recently Learned Words">
        <RecentStatsGraph
          className="grid-item-align-bottom"
          graphData={data}
        ></RecentStatsGraph>
      </Card>

      <JLPTCard
        title="Progress to JLPT N1"
        percentage={75}
        vocab={3244}
        days={388}
        streak={streak}
        consistency={83}
      />

      <Card className="words-by-memory" title="Words By Memory Level">
        <div className="memory-cards">
      <VocabCount bgColor="#6BB895" lvColor="#569478" level={1} vocabCount={96} />
      <VocabCount bgColor="#9DDAD5" lvColor="#8BBEBA" level={2} vocabCount={167} />
      <VocabCount bgColor="#8ED9F5" lvColor="#75B8D0" level={3} vocabCount={86} />
      <VocabCount bgColor="#8DBEF9" lvColor="#7BA6DB" level={4} vocabCount={43} />
      <VocabCount bgColor="#55A6DA" lvColor="#4D97C7" level={5} vocabCount={565} />
      <VocabCount bgColor="#C37AE1" lvColor="#AE6EC8" level={6} vocabCount={627} />
      <VocabCount bgColor="#ED67A7" lvColor="#DB609B" level={7} vocabCount={2918} />
      </div>
      </Card>

      <Card className="grammar-progress" title="Grammar Progress">
      <div className="progress-wheels" >
      <GrammarProgressBar jlptlevel={'N5'} backgroundColor={'#6BB895'} trailColor={'#569478'} percentComplete={50}></GrammarProgressBar>
      <GrammarProgressBar jlptlevel={'N4'} backgroundColor={'#8ED9F5'} trailColor={'#75B8D0'} percentComplete={70}></GrammarProgressBar>
      <GrammarProgressBar jlptlevel={'N3'} backgroundColor={'#55A6DA'} trailColor={'#4D97C7'} percentComplete={30}></GrammarProgressBar>
      <GrammarProgressBar jlptlevel={'N2'} backgroundColor={'#C37AE1'} trailColor={'#AE6EC8'} percentComplete={15}></GrammarProgressBar>
      <GrammarProgressBar jlptlevel={'N1'} backgroundColor={'#ED67A7'} trailColor={'#DB609B'} percentComplete={1}></GrammarProgressBar>


      </div> 
</Card>
    </div>
  );
};

export default Dashboard;
