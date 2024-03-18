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
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: function (context) {
          if (context.tick && context.tick.label === "Today") {
            return "#61AE8B";
          }
          return "#D9D9D9";
        },

        font: {
          weight: "bold",
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#D9D9D9",
        borderWidth: 2,
        drawBorder: false,
        drawTicks: false,
      },
      ticks: {
        stepSize: 2,
        color: "#D9D9D9",
      },
    },
  },
};





function getPreviousSixDays() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date();
  let labels = days.slice(today.getDay()).concat(days.slice(0, today.getDay()));
  labels[labels.length - 1] = "Today";
  return labels;
}

function RecentStatsGraph({ graphData }) {
  const labels = getPreviousSixDays();
  const newData = {
    ...graphData,
    labels,
  };

  return <Bar className="chart" options={options} data={newData} />;
}
export default RecentStatsGraph;
