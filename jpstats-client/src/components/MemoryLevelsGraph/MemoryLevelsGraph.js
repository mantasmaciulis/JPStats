import React, {useState, useEffect} from "react";
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
        stepSize: 200,
        color: "#D9D9D9",
      },
    },
  },
};

function MemoryLevelsGraph({ graphData }) {
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

  const labelsSmallScreen = [
    "Lvl 1",
    "Lvl 2",
    "Lvl 3",
    "Lvl 4",
    "Lvl 5",
    "Lvl 6",
    "Lvl 7",
    "Lvl 8"
  ];
  const labelsBigScreen = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
    "Level 6",
    "Level 7",
    "Level 8"
  ];

  const labels = isMobile ? labelsSmallScreen : labelsBigScreen

  const newData = {
    ...graphData,
    labels,
  };
  console.log(graphData)

  return <Bar className="chart" options={options} data={newData} />;
}
export default MemoryLevelsGraph;
