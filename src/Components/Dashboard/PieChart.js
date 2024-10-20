import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ myData }) => {
  const labels = myData?.map((item) => item?.name);
  const values = myData?.map((item) => Number(item?.percentage));

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Percentage",
        data: values,
        backgroundColor: [
          "rgba(26, 86, 219, 1)",
          "rgba(253, 186, 140, 1)",
          "rgba(22, 189, 202, 1)",
          "rgba(214, 31, 105, 1)",
          "rgba(88, 80, 236, 1)",
        ],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
