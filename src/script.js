let now = new Date();

let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let year = now.getFullYear();

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day} ${month} ${date}, ${year} ${hour}:${minute}`;

function citySearch(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  let searchInput = document.querySelector("#formGroupExampleInput");

  h1.innerHTML = searchInput.value;
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";

  let currentCityValue = searchInput.value;
  console.log(currentCityValue);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityValue}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", citySearch);

function showTemperature(response) {
  let mainTemperature = document.querySelector(".main-temperature");
  mainTemperature.innerHTML = Math.round(response.data.main.temp);
}
