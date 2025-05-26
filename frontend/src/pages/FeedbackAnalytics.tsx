import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "../api/axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Navbar from "../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type FeedbackDataPoint = { rating: number; count: number };

export default function FeedbackAnalytics() {
  const [feedbackData, setFeedbackData] = useState<FeedbackDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/reports/feedback-summary")
      .then((res) => {
        setFeedbackData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading feedback summary:", err);
        setLoading(false);
      });
  }, []);

  // Fallback default data (if API returns empty)
  const safeFeedbackData = feedbackData.length
    ? feedbackData
    : [
        { rating: 1, count: 0 },
        { rating: 2, count: 0 },
        { rating: 3, count: 0 },
        { rating: 4, count: 0 },
        { rating: 5, count: 0 },
      ];

  const data = {
    labels: safeFeedbackData.map(
      (d) => `${d.rating} Star${d.rating > 1 ? "s" : ""}`
    ),
    datasets: [
      {
        label: "Number of Ratings",
        data: safeFeedbackData.map((d) => d.count),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Customer Feedback Summary" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ minHeight: 300 }}>
        <h4>Customer Feedback Summary</h4>
        {loading ? (
          <p>Loading feedback data...</p>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </>
  );
}
