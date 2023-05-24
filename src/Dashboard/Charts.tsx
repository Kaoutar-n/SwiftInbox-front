// import { Chart } from "chart.js/auto";


//   const canvas = document.getElementById("myChart") as HTMLCanvasElement;
//   const canvas2 = document.getElementById("mySecondChart") as HTMLCanvasElement;

//   if (canvas) {
//     const context = canvas.getContext("2d");
//     if (context) {
//       const chart = new Chart(context, {
//         type: "polarArea",
//         data: {
//           labels: ["Negative", "Positive", "Neutral"],
//           datasets: [
//             {
//               label: "My dataset",
//               data: [1200, 1900, 3000],
//               backgroundColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//               ],
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//         },
//       });
//     } else {
//       console.error("Failed to get 2D context from canvas element!");
//     }
//   } else {
//     console.error("Canvas element not found!");
//   }

//   if (canvas2) {
//     const context = canvas2.getContext("2d");
//     if (context) {
//       const chart = new Chart(context, {
//         type: "bar",
//         data: {
//           labels: [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//           ],
//           datasets: [
//             {
//               label: "My dataset",
//               data: [11200, 21900, 13000, 22500, 32000, 23000, 11500],
//               backgroundColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//                 "rgba(255, 99, 132, 1)",
//               ],
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//             },
//           },
//         },
//       });
//     } else {
//       console.error("Failed to get 2D context from canvas element!");
//     }
//   } else {
//     console.error("Canvas element not found!");
//   }

export {};
