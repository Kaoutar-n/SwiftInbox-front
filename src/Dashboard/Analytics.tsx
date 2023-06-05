import { Chart, registerables } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export function Analytics() {
  const chartRef1 = useRef<HTMLCanvasElement>(null);
  const chartRef2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initializeCharts = () => {
      const canvas1 = chartRef1.current;
      const canvas2 = chartRef2.current;

      if (canvas1) {
        const context = canvas1.getContext("2d");
        if (context) {
          // Destroy existing chart with ID '2'
          Chart.register(...registerables);
          const existingChart = Chart.getChart(canvas1);
          if (existingChart) {
            existingChart.destroy();
          }

          // Create new polarArea chart
          new Chart(context, {
            type: "polarArea",
            data: {
              labels: ["Negative", "Positive", "Neutral"],
              datasets: [
                {
                  label: "My dataset",
                  data: [1200, 1900, 3000],
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
            },
          });
        } else {
          console.error("Failed to get 2D context from canvas element!");
        }
      } else {
        console.error("Canvas element not found!");
      }

      if (canvas2) {
        const context = canvas2.getContext("2d");
        if (context) {
          // Destroy existing chart with ID '0'
          Chart.register(...registerables);
          const existingChart = Chart.getChart(canvas2);
          if (existingChart) {
            existingChart.destroy();
          }

          // Create new bar chart
          new Chart(context, {
            
            type: "line",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "Juin",
                "July",
              ],
              datasets: [
                {
                  data: [11200, 21900, 13000, 22500, 32000, 23000, 11500],
                  backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                  ],
                },
              ],
            },
            options: {

          


              responsive: true,
              plugins: {
                legend: {
                    display: false
                }
               },

              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          console.error("Failed to get 2D context from canvas element!");
        }
      } else {
        console.error("Canvas element not found!");
      }
    };

    initializeCharts();
  }, []);

  const status = "analytics";
  return (
    <div className="home">
      <SideBar status={status} />
      <section id="content">
        <TopBar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Analytics</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Analytics
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="table-data">
            <div className="Emails-mang">
              <div className="head">
                <h3>Recent Analytics</h3>
              </div>
              <div className="graphBox">
                <div className="box">
                  <canvas ref={chartRef1} id="myChart"></canvas>
                </div>
                <div className="box">
                  <canvas ref={chartRef2} id="mySecondChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Analytics;
