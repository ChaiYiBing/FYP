import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StatisticsPage({ isAdmin }) {
  const navigate = useNavigate();
  const [barChartData, setBarChartData] = useState([["Product", "Sales"]]);
  const [lineChartData, setLineChartData] = useState([["Month", "Sales"]]);

  // Fetch sales data from the backend
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sales");
        const salesData = response.data;

        // Prepare data for Bar Chart
        const barData = [["Product", "Sales"]];
        const lineData = [["Month", "Sales"]];

        const productSales = {};
        const monthlySales = {};

        salesData.forEach((sale) => {
          // Prepare bar chart data
          if (productSales[sale.product_name]) {
            productSales[sale.product_name] += sale.total_sales;
          } else {
            productSales[sale.product_name] = sale.total_sales;
          }

          // Prepare line chart data (monthly)
          if (monthlySales[sale.month]) {
            monthlySales[sale.month] += sale.total_sales;
          } else {
            monthlySales[sale.month] = sale.total_sales;
          }
        });

        // Convert product sales to barData
        for (const [product, total] of Object.entries(productSales)) {
          barData.push([product, total]);
        }

        // Convert monthly sales to lineData
        for (const [month, total] of Object.entries(monthlySales)) {
          lineData.push([month, total]);
        }

        setBarChartData(barData);
        setLineChartData(lineData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        alert("Failed to load sales data.");
      }
    };

    fetchSalesData();
  }, []);

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
