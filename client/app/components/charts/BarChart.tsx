"use client";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import Chart from "react-apexcharts";

type Props = {
  title: string;
  data: number[];
  categories: string[];
  color?: string;
  percentageChange?: number;
};

const BarChart: React.FC<Props> = ({
  title,
  data,
  categories,
  color = "#3b82f6",
  percentageChange,
}) => {
  const options = {
    chart: {
      id: "bar-chart",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [color],
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
    },
    xaxis: {
      categories,
      labels: {
        style: { colors: "#9ca3af" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9ca3af" },
      },
    },
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: "#e5e7eb",
    },
  };

  const series = [
    {
      name: title,
      data,
    },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-black text-lg font-semibold">{title}</h2>
        {percentageChange !== undefined && (
          <span
            className={`text-sm font-medium ${
              percentageChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {percentageChange >= 0 ? <TrendingUp /> : <TrendingDown />}{" "}
            {Math.abs(percentageChange)}%
          </span>
        )}
      </div>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default BarChart;
