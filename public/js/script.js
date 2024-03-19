
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const ctx1 = document.getElementById("chart-1").getContext('2d');

const myFirstChart = new Chart(ctx1, {
  type:"line",
  data: {
    labels:["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    datasets: [{
      label: "last week",
      backgroundColor: "rgba(164, 198, 247, 1)",
      borderColor: "rgb(47,128,237)",
      data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }
});

const ctx2 = document.getElementById("chart-2").getContext('2d');

const mySecondChart = new Chart(ctx2, {
  type:"doughnut",
  data: {
    labels:["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    datasets: [{
      label: "last week",
      backgroundColor: "rgba(164, 198, 247, 1)",
      borderColor: "rgb(47,128,237)",
      data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }
});

const ctx3 = document.getElementById("chart-3").getContext('2d');

const myThirdChart = new Chart(ctx3, {
  type:"bar",
  data: {
    labels:["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    datasets: [{
      label: "last week",
      backgroundColor: "rgba(164, 198, 247, 1)",
      borderColor: "rgb(47,128,237)",
      data: [3000, 4200, 2000, 5100, 6420, 8520, 7352],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  }
});