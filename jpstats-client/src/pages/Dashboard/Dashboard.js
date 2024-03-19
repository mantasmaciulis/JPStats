import React from "react";
import Card from "../../components/Card/Card";
import JLPTCard from "../../components/JLPTCard/JLPTCard";
import RecentStatsGraph from "../../components/RecentStatsGraph/RecentStatsGraph";
import VocabCount from "../../components/VocabCount/VocabCount";
import "./Dashboard.css";
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
        streak={69}
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

      <Card className="grammar-progress" title="Grammar Progress"></Card>
    </div>
  );
};

export default Dashboard;
