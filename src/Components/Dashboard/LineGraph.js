import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  PointElement,
} from "chart.js";

ChartJS.register(
  PointElement,
  LineElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ myData }) => {
  // Data for labels (months) and revenue/expense values
  const labels = myData?.map((item) => item.month);
  const revenue = myData?.map((item) => item.revenue);
  const expense = myData?.map((item) => item.expense);

  const data = {
    labels,

    datasets: [
      {
        label: "Revenue",
        data: revenue,
        backgroundColor: "rgba(28, 100, 242, 0.1)",
        borderColor: "rgba(28, 100, 242, 1)",
        fill: true,
        tension: 0.4,
        pointBorderColor: "rgba(28, 100, 242, 1)",
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: "rgba(253, 186, 140, 0.1)",
        borderColor: "rgba(253, 186, 140, 1)",
        fill: true,
        tension: 0.4,
        pointBorderColor: "rgba(253, 186, 140, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const rev = revenue[index];
            const exp = expense[index];
            const diff = rev - exp;
            const percentage = ((diff / rev) * 100).toFixed(2);

            return [
              `${diff > 0 ? "+" : ""}${diff}k (${percentage}%)`,
              `Revenue: ${rev}k`,
              `Expense: ${exp}k`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value}k`;
          },
          font: {
            family: "Metropolis",
            size: 14,
            weight: 600,
          },
          color: "rgba(75, 85, 99, 1)",
        },
      },
      x: {
        ticks: {
          font: {
            family: "Metropolis",
            size: 14,
            weight: 600,
          },
          color: "rgba(75, 85, 99, 1)",
        },
      },
    },
  };

  return <Line className="w-full" data={data} options={options}></Line>;
};

export default Graph;
