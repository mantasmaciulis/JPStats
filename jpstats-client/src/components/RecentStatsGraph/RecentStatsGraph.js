import React from "react";
import "./RecentStatsGraph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false, // This will hide vertical grid lines
      },
      ticks: {
        color: "#D9D9D9", // Set the X-axis tick labels to light gray
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#D9D9D9", // Set to light gray color
        borderWidth: 2, // Make grid lines thicker
        drawBorder: false, // Optionally remove the axis border
        drawTicks: false, // Optionally remove the ticks on the grid lines
      },
      ticks: {
        // Define how often grid lines should appear
        // For example, if your data ranges from 0 to 40, setting stepSize to 5 will create a grid line every 5 units
        stepSize: 2,
        color: "#D9D9D9", // Set the tick labels to light gray if you want
      },
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "New words",
      data: [100, 156, 120, 150, 43, 120, 90],
      backgroundColor: "rgba(208, 76, 76, 0.85)",
      borderColor: "rgb(0,0,0)",
    },
  ],
};

function RecentStatsGraph() {
  return <Bar className="chart" options={options} data={data} />;
}
export default RecentStatsGraph;
