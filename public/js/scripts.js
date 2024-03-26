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

// Disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

// Charts rendering
let drawGraph = (typeOfGraph, canvasId, dataObject, graphOptions) => {

  const canvas = document.getElementById(canvasId);

  if (canvas) {
    const myChart = new Chart(canvas.getContext('2d'), {
      type: typeOfGraph,
      data: dataObject,
      options: graphOptions
    });
  }
};

// Dashboard preliminary graphs
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
  labels: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
  datasets: [{
    label: "last week",
    backgroundColor: "rgba(164, 198, 247, 1)",
    borderColor: "rgb(47,128,237)",
    data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
  }]
};

// Datatable definition
let table = new DataTable('#datatableGen');

drawGraph('line', "chart-1", graphData, graphOpt);
drawGraph('doughnut', "chart-2", graphData, graphOpt);
drawGraph('bar', "chart-3", graphData, graphOpt);