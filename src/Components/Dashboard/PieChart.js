import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement, // Import ArcElement for pie/doughnut charts
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ myData }) => {
  // Dummy data for the pie chart
  const labels = myData?.map((item) => item.category);
  const values = myData?.map((item) => item.value);

  const data = {
    labels:
      labels.length > 0
        ? labels
        : [
            "Category 1",
            "Category 2",
            "Category 3",
            "Category 4",
            "Category 5",
          ],
    datasets: [
      {
        label: "Category Distribution",
        data: values.length > 0 ? values : [10, 20, 30, 25, 15],
        backgroundColor: [
          "rgba(26, 86, 219, 1)", // Color 1
          "rgba(253, 186, 140, 1)", // Color 2
          "rgba(22, 189, 202, 1)", // Color 3
          "rgba(214, 31, 105, 1)", // Color 4
          "rgba(88, 80, 236, 1)", // Color 5
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)", // White border to make colors pop
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
