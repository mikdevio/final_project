
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


let drawGraph = (typeOfGraph, canvasId, dataObject, graphOptions) => {
  const ctx3 = document.getElementById(canvasId).getContext('2d');

  const myThirdChart = new Chart(ctx3, {
    type: typeOfGraph,
    data: dataObject,
    options: graphOptions
  });
};

const graphOpt = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  }
};

const graphData = {
  labels:["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
  datasets: [{
    label: "last week",
    backgroundColor: "rgba(164, 198, 247, 1)",
    borderColor: "rgb(47,128,237)",
    data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
  }]
};

drawGraph('line', "chart-1", graphData, graphOpt);
drawGraph('doughnut', "chart-2", graphData, graphOpt);
drawGraph('bar', "chart-3", graphData, graphOpt);
