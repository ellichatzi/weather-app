function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
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
let day = document.querySelector("h2.day");
let now = new Date();
let minutes = now.getMinutes();
let hour = now.getHours();
let currentDay = weekdays[now.getDay()];

if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0 ${minutes}`;
}

day.innerHTML = `${currentDay}`;
let time = document.querySelector("h2.time");
time.innerHTML = `${hour}:${minutes}`;

function presentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enterCity");
  let currentCity = document.querySelector("#currentCity");
  currentCity.innerHTML = ` ${searchInput.value}`;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "9b4ea4a09ca2cf04ce4190565f6f899b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let citySearch = document.querySelector("#cityForm");
citySearch.addEventListener("submit", presentCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let tempResponse = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#currentCity");
  let presentTemp = document.querySelector("#temperature");
  presentTemp.innerHTML = `${tempResponse}º`;
  currentCity.innerHTML = ` ${response.data.name}`;
}

function getCurrentPosition(position) {
  let lon = console.log(position.coords.longitude);
  let lat = console.log(position.coords.latitude);
  let apiKey = "9b4ea4a09ca2cf04ce4190565f6f899b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", retrievePosition);
