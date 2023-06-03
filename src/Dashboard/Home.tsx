import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEnvelopeCircleCheck,
  faCalendarCheck,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

import { Chart, registerables } from "chart.js/auto";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import  API  from "../API";

// import './script'
export function Home() {
  const chartRef1 = useRef<HTMLCanvasElement>(null);
  const chartRef2 = useRef<HTMLCanvasElement>(null);

  const status = "dashboard";
  const storedData = localStorage.getItem("userDetails");
  const parseddata = JSON.parse(storedData!);
  const id = parseddata.id;
  const [data, setData] = useState<any>([]);
  const GetData = () => {
    if (id) {
      const requestBody = id;
      fetch(`${API.Link}Dashboard/GetDashboardData`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())

        .then((data) => {
          console.log(data);
          setData(data)
        })
        .catch((error) => {
          console.error("Error: ", error);
          toast.error("No Data Found!");
        });
    } else {
      console.error("No ID found in local storage");
    }
  };

  useEffect(() => {
    GetData();
  }, []);
  

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
                  data: data.categoriesCount
                    ? [data.categoriesCount[0], data.categoriesCount[1], data.categoriesCount[-1]]
                    : [] ,
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
          const lineChartData = data.receivedByMonth
          ? [
              data.receivedByMonth[1],
              data.receivedByMonth[2],
              data.receivedByMonth[3],
              data.receivedByMonth[4],
              data.receivedByMonth[5],
              data.receivedByMonth[6],
              data.receivedByMonth[7],
              data.receivedByMonth[8],
              data.receivedByMonth[9],
              data.receivedByMonth[10],
              data.receivedByMonth[11],
              data.receivedByMonth[12],
            ]
          : [];
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
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                data: lineChartData,
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 0, 0, 1)",
                  "rgba(0, 255, 0, 1)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
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
  }, [data.categoriesCount, data.receivedByMonth]);
  

  return (
    <div className="home">
      <SideBar status={status} />

      <section id="content">
        <TopBar />

        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <FontAwesomeIcon icon={faAngleRight} className="ico" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            {/* <a href="" className="btn-download">
              <FontAwesomeIcon icon={faCloudArrowDown} className="ico" />
              <span className="text">Download PDF</span>
            </a> */}
          </div>
          <ul className="box-info">
            <li>
              <i className="ico">
                <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
              </i>
              <span className="text">
                <h3>{data.receivedMails}</h3>
                <p>New Mails</p>
              </span>
            </li>
            <li>
              <i className="ico">
                <FontAwesomeIcon icon={faPaperPlane} />
              </i>

              <span className="text">
                <h3>{data.mailSent}</h3>
                <p>Sent</p>
              </span>
            </li>
            <li>
              <i className="ico">
                {" "}
                <FontAwesomeIcon icon={faCalendarCheck} />
              </i>
              <span className="text">
                <h3> {data.totalCustomers} </h3>
                <p>Total Customers</p>
              </span>
            </li>
          </ul>
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
