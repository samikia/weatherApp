
  // write your code here
  
  ////////////////////////////////////////////////////////////
  let time = document.querySelector("#localTime");
  let now = new Date();
  function formatData(data) {
    let currntHours = now.getHours();
    if (currntHours < 10) {
      currntHours = `0 ${currntHours}`;
    }
  
    let currentMin = now.getMinutes();
    if (currentMin < 10) {
      currentMin = `0${currentMin}`;
    }
  
    let days = ["Sun", "Mon", "Tus", "Wed", "Thr", "Fri", "Sut"];
    let currentDay = days[now.getDay()];
    return `${currentDay} ${currntHours}:${currentMin}`;
  }
  
  time.innerHTML = formatData(now);
  ////////////////////////////////////////////////////////////
  function currentWeather(response){
  document.querySelector('#city').innerHTML=response.data.name
  document.querySelector('#temperature').innerHTML=Math.floor(response.data.main.temp)
  document.querySelector('#wind').innerHTML=Math.round(response.data.wind.speed)
  document.querySelector('#humidity').innerHTML=response.data.main.humidity;
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
  }
  function searchCity(city) {
    let apiKey = 'ae8a1230e3e8427c36d183396c097b5c';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(currentWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-input").value;
    searchCity(city);
  }
  function searchLocation(position){
    let latitude=position.coords.latitude
    let longitude=position.coords.longitude
    let apiKey='ae8a1230e3e8427c36d183396c097b5c'
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(currentWeather);
  }
  function getCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  let form=document.querySelector('#form-search')
  form.addEventListener('submit',handleSubmit)
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchCity("New York");
  ///////////////////////////////////////////////////////////
  