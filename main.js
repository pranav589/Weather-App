//getting the api key and url
const api = {
  key: "f2555d1e94599dfc0b75bb332b9be43e",
  baseurl: "http://api.openweathermap.org/data/2.5/"
}

//get reference to the search box
const searchBox = document.querySelector('.search-box');

//adding event to the search box
searchBox.addEventListener('keypress', setQuery);


function setQuery(event) {
  //if enter key is pressed
  if (event.keyCode == 13) {
    getResults(searchBox.value);
  }
}

//function of getResults
function getResults(query) {
  //fetching the api
  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(function(weather) {
      return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {

  console.log(weather);

  //grabbing the city
  let city = document.querySelector('.location .city');

  //innerTextof city and country
  city.innerText = `${weather.name},${weather.sys.country}`;

  let now = new Date();

  //grabbingthe date element
  let date = document.querySelector('.location .date');

  date.innerText = dateBuilder(now);

  //garbbing the temp element
  let temp = document.querySelector('.current .temp');

  //display the temp in UI
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  //grabbing the weather element
  let weather_el = document.querySelector('.current .weather');

  //display the weather in UI
  weather_el.innerText = weather.weather[0].main;

  //grabbing the hi-low element
  let hiLow = document.querySelector('.hi-low');

  //display the hi-low in UI
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

  //garbbing the wind element
  let wind = document.querySelector('.wind');
  wind.innerText = `${weather.wind.speed} km/h`
}

function dateBuilder(d) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}