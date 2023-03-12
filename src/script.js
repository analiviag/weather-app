let now = new Date();

let hour = now.getHours();
if (hour < 10) {
  hour = `0{hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0{minute}`;
}
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

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day}, ${hour}:${minute}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = documento.querySelector("#current-city");
  let descriptionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function citySearch(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  let searchInput = document.querySelector("#formGroupExampleInput");

  h1.innerHTML = searchInput.value;
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let currentCityValue = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityValue}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let currentCity = document.querySelector("#search-form");
currentCity.addEventListener("submit", citySearch);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiuslink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = documento.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener(submit, handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiuslink = document.querySelector("celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemperature);
