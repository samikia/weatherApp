// write your code here

////////////////////////////////////////////////////////////
function formatData(timesTamp) {
  let date = new Date(timesTamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let currentDay = days[date.getDay()];
  return `${currentDay} ${hours}:${minutes}`;
}
function formatDay(timesTamp) {
  let date = new Date(timesTamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tus", "Wed", "Thr", "Fri", "Sut"];

  return days[day];
}
function displayForcast(response) {
  console.log(response.data.daily);
  let forcastElement = document.querySelector("#forcast");
  let forcastHtml =
    ' <div class="row row-cols-1 row-cols-md-5 g-4 text-center">';

  let forcast = response.data.daily;

  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHtml =
        forcastHtml +
        `
    <div class="col">
      <div class="card h-100 rounded-pill">
        <div class="card-body">
          <h5
            class="card-title fw-semibold"
            id="weather-forcast-date"
          >
            ${formatDay(forcastDay.dt)}
          </h5>
          <ul class="forcastDays">
            <li class="card-text" id="weather-forcast-tempratures">
              <span class="weather-forcast-temp-max">${Math.round(
                forcastDay.temp.max
              )}°</span
              ><span class="weather-forcast-temp-min">${Math.round(
                forcastDay.temp.min
              )}°</span>
            </li>
            <li>
              <img
                src="http://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png"
                width="42"
                alt=""
                id="icon"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>`;
    }
  });

  forcastHtml = forcastHtml + `</div>`;
  forcastElement.innerHTML = forcastHtml;
}
function getForcast(coordinates) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#localTime");
  let iconElement = document.querySelector("#icon");
  celsuisTemp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsuisTemp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatData(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
  getForcast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFornhitTemp(event) {
  event.preventDefault();
  let farenhitTemp = (celsuisTemp * 9) / 5 + 32;
  celsuisLink.classList.remove("active");
  fornhitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenhitTemp);
}

function showCeleciousTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsuisLink.classList.add("active");
  fornhitLink.classList.remove("active");
  temperatureElement.innerHTML = celsuisTemp;
}

let celsuisTemp = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

let celsuisLink = document.querySelector("#celsius-link");
celsuisLink.addEventListener("click", showCeleciousTemp);

let fornhitLink = document.querySelector("#fornhit-link");
fornhitLink.addEventListener("click", showFornhitTemp);
///////////////////////////////////////////////////////////
