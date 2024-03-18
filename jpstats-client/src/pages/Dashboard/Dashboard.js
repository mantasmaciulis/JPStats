import React from "react";
import Card from "../../components/Card/Card";
import JLPTCard from "../../components/JLPTCard/JLPTCard";
import RecentStatsGraph from "../../components/RecentStatsGraph/RecentStatsGraph";
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

      <Card className="words-by-memory" title="Words By Memory Level"></Card>

      <Card className="grammar-progress" title="Grammar Progress"></Card>
    </div>
  );
};

export default Dashboard;
