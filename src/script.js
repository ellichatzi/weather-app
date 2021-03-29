function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}º`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = document.querySelector(".dayToday");
let now = new Date();
let minutes = now.getMinutes();
let hour = now.getHours();
let currentDay = weekdays[now.getDay()];

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

day.innerHTML = `${currentDay}`;
let time = document.querySelector("li.time");
time.innerHTML = `${hour}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (hours < 10) {
    hour = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function presentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = ` ${searchInput.value}`;

  searchCity(searchInput.value);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
                <div class="col-2">
                  <h3 class="forecast-Time">${formatHours(
                    forecast.dt * 1000
                  )}</h3>
                  <img
                   src=     "https://openweathermap.org/img/wn/${
                     forecast.weather[0].icon
                   }@2x.png"
    
                    id="forecast-icon"
                  />
                  <div class="forecast-temperature"><strong>${Math.round(
                    forecast.main.temp_max
                  )}º</strong>|${Math.round(forecast.main.temp_min)}º</div>
                </div>
              `;
  }
}

function searchCity(city) {
  let apiKey = "9b4ea4a09ca2cf04ce4190565f6f899b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(displayForecast);
}

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", presentCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusTemperature = null;

function showTemperature(response) {
  console.log(response.data);
  let tempResponse = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#currentCity");
  let presentTemp = document.querySelector("#temperature");
  let iconElement = document.querySelector("#icon");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");

  celsiusTemperature = Math.round(response.data.main.temp);

  presentTemp.innerHTML = `${tempResponse}º`;
  currentCity.innerHTML = ` ${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description} in`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
}

function getCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "9b4ea4a09ca2cf04ce4190565f6f899b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  let apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(displayForecast);
}
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", retrievePosition);

searchCity("Athens");
