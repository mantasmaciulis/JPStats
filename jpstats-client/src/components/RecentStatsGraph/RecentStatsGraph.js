import React, {useState, useEffect} from "react";
import "./RecentStatsGraph.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
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
          if (context.tick && ( context.tick.label === "Today" || context.tick.label === "Now") ) {
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

function getPreviousSixDays(days, currentDayLabel) {
  const today = new Date();
  let labels = days.slice(today.getDay()).concat(days.slice(0, today.getDay()));
  labels[labels.length - 1] = currentDayLabel;
  return labels;
}

function RecentStatsGraph({ graphData }) {
  //To make graph nicer for mobile users
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth < 650) {
        setIsMobile(true)
    } else {
        setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const daysSmallScreen = [
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
    "Sun",
  ];
  const daysBigScreen = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let days = isMobile ? daysSmallScreen : daysBigScreen
  let currentDayLabel = isMobile ? "Now" : "Today"

  const labels = getPreviousSixDays(days, currentDayLabel);
  const newData = {
    ...graphData,
    labels,
  };

  return <Bar className="chart" options={options} data={newData} />;
}
export default RecentStatsGraph;
