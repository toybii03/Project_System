// src/pages/Reports.tsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  date: string;
  total_sales: number;
}

const Reports: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/reports/sales-trends")
      .then((res) => {
        setSalesData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sales trends:", err);
        setLoading(false);
      });
  }, []);

  const data = {
    labels: salesData.map((s) => s.date),
    datasets: [
      {
        label: "Total Sales",
        data: salesData.map((s) => s.total_sales),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Sales Trends Over Time" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Sales Reports</h2>
        {loading ? (
          <p>Loading sales data...</p>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </>
  );
};

export default Reports;
