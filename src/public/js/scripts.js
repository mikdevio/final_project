// scripts.js app functionalities

// Sidebar toogle functionality
(() => {
  const hamBurger = document.querySelector(".toggle-btn");

  if (hamBurger) {
    hamBurger.addEventListener("click", function () {
      document.querySelector("#sidebar").classList.toggle("expand");
    });
  }
})();

// Charts rendering
const drawGraph = (typeOfGraph, canvasId, dataObject, graphOptions) => {
  const canvas = document.getElementById(canvasId);

  if (canvas) {
    const myChart = new Chart(canvas.getContext("2d"), {
      type: typeOfGraph,
      data: dataObject,
      options: graphOptions,
    });

    return myChart;
  }
};

// Dashboard preliminary graphs
const graphOpt = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const graphData = {
  labels: [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ],
  datasets: [
    {
      label: "last week",
      backgroundColor: "rgba(164, 198, 247, 1)",
      borderColor: "rgb(47,128,237)",
      data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
    },
  ],
};

// Datatable definition
let table = new DataTable("#datatableGen");
let table_dashboard = new DataTable("#dashboardTable");

let charts = [];

charts.push(drawGraph("line", "chart-0", graphData, graphOpt));
charts.push(drawGraph("bubble", "chart-1", graphData, graphOpt));
charts.push(drawGraph("scatter", "chart-2", graphData, graphOpt));
charts.push(drawGraph("bar", "chart-3", graphData, graphOpt));