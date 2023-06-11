
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
    console.log(response);
    celsuisTemp=Math.floor(response.data.main.temp)
  document.querySelector('#city').innerHTML=response.data.name
  document.querySelector('#temperature').innerHTML=celsuisTemp
  document.querySelector('#wind').innerHTML=Math.round(response.data.wind.speed)
  document.querySelector('#humidity').innerHTML=response.data.main.humidity;
  document.querySelector("#description").innerHTML =
  response.data.weather[0].main;
  document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].main);
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
  function showFornhitTemp(event){
    event.preventDefault()
    let farenhitTemp=(celsuisTemp*9)/5+32
    celsuisLink.classList.remove("active")
    fornhitLink.classList.add("active")
  let temperatureElement= document.querySelector("#temperature")
  temperatureElement.innerHTML=Math.round(farenhitTemp)

  }
  function showCeleciousTemp(event){
    event.preventDefault()
    let temperatureElement= document.querySelector("#temperature")
    celsuisLink.classList.add("active")
    fornhitLink.classList.remove("active")
    temperatureElement.innerHTML=celsuisTemp

  }
  let celsuisTemp=null;
  let form=document.querySelector('#form-search')
  form.addEventListener('submit',handleSubmit)
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  searchCity("New York");
  let celsuisLink=document.querySelector("#celsius-link")
  celsuisLink.addEventListener("click",showCeleciousTemp)
  let fornhitLink=document.querySelector("#fornhit-link")
  fornhitLink.addEventListener("click",showFornhitTemp)
  ///////////////////////////////////////////////////////////
  