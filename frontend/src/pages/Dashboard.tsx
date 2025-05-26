import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import axios from "../api/axios"; // Adjust path if necessary

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

type SalesDataPoint = { date: string; total_sales: number };
type FeedbackDataPoint = { rating: number; count: number };

export default function Dashboard() {
  const [salesData, setSalesData] = useState<SalesDataPoint[]>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackDataPoint[]>([]);

  useEffect(() => {
    axios.get("/reports/sales-trends").then((res) => setSalesData(res.data));
    axios
      .get("/reports/feedback-summary")
      .then((res) => setFeedbackData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Dashboard</h2>
        <div className="row mt-4">
          <div className="col-md-6">
            <h4>Sales Trends</h4>
            <Line
              data={{
                labels: salesData.map((d) => d.date),
                datasets: [
                  {
                    label: "Sales",
                    data: salesData.map((d) => d.total_sales),
                    borderColor: "rgb(75, 192, 192)",
                    backgroundColor: "rgba(75, 192, 192, 0.4)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
          <div className="col-md-6">
            <h4>Customer Feedback Summary</h4>
            <Bar
              data={{
                labels: feedbackData.map((d) => `${d.rating} Stars`),
                datasets: [
                  {
                    label: "Number of Ratings",
                    data: feedbackData.map((d) => d.count),
                    backgroundColor: "rgba(255, 99, 132, 0.7)",
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
