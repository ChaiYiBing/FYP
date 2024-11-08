import React from "react";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function StatisticsPage({ isAdmin }) {
  const navigate = useNavigate(); // Initialize navigate

  // Data for the charts (Replace with real data as needed)
  const barChartData = [
    ["Product", "Sales"],
    ["Graphic Tee", 100],
    ["Hoodie", 80],
    ["Basic Tee", 60],
    ["Long Sleeve Tee", 40],
    ["V-Neck Tee", 30],
  ];

  const lineChartData = [
    ["Month", "Sales"],
    ["January", 100],
    ["February", 120],
    ["March", 130],
    ["April", 140],
    ["May", 150],
  ];

  // Chart options
  const chartOptions = {
    titleTextStyle: {
      fontSize: 18,
      bold: true,
    },
    legend: { position: "bottom" },
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <h2 className="text-center mb-4">Statistics</h2>
      
      <div className="row mb-5">
        <div className="col-md-12">
          <h5 className="text-center">Sales by Product</h5>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={barChartData}
            options={{
              ...chartOptions,
              title: "Sales by Product",
            }}
          />
        </div>
      </div>

      {isAdmin && (
        <div className="row mt-5">
          <div className="col-12">
            <h5 className="text-center">Sales Over Time (Admin Only)</h5>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={lineChartData}
              options={{
                ...chartOptions,
                title: "Sales Over Time",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;
