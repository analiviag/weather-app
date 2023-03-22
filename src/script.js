function formatDate(timestamp) {
  let now = new Date(timestamp);

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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
  return `${day}, ${hour}:${minute}`;
}

function getForecast(coordinates) {
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#current-city");
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
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let otherDays = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  otherDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                />

                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> 18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#formGroupExampleInput");
  search(cityInputElement.value);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Vancouver");
