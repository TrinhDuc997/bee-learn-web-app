import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box } from "@mui/material";
interface ChartReviewProps {
  data: number[];
}

const ChartReview: React.FC<ChartReviewProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    Chart.register(ChartDataLabels); // Đăng ký plugin ChartDataLabels
    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstance.current = new Chart(ctx, getConfig(data));
    }
  }, [data]);

  const getConfig = (data: number[]): ChartConfiguration => {
    return {
      type: "bar",
      data: {
        labels: ["Level 1", "Level 2", "Level 3", "Level 4"],
        datasets: [
          {
            label: "Số lượng từ vựng",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 2,
            borderRadius: [15, 15, 15, 15], // Góc bo trên cột đầu tiên
          },
        ],
      },
      options: getOptions(),
    };
  };

  const getOptions = (): ChartOptions => {
    return {
      scales: {
        y: {
          display: false,
        },
        x: {
          display: true,
          grid: {
            display: false, // Ẩn gạch phân cách trục x
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Ẩn chú thích
        },
        tooltip: {
          enabled: false, // Ẩn tooltip
        },
        datalabels: {
          anchor: "end",
          align: "center",
          font: {
            size: 20,
          },
          formatter: (value) => {
            return value;
          }, // Hiển thị số lượng trên đầu cột
        },
      },
      layout: {
        padding: 5,
      },
    };
  };

  return <canvas ref={chartRef} />;
};

export default ChartReview;
