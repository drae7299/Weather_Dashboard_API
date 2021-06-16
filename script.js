//global variables 
var userHistory = [];
var weatherApi = 'https://api.openweathermap.org';
var weatherKey = 'd91f911bcf2c0f925fb6535547a5ddc9';


//elements to append to dom
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var nowContainer = document.querySelector('#now');
var forecastContainer = document.querySelector('#forecast');
var userHistoryContainer = document.querySelector('#history')
//event listerner on submit
function populateUserHistory() {
    userHistoryContainer.innerHTML = "";
//loop through recent search to give most recent 
//also added in the ability for the on click button to access the container to append into the innner html
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');
        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
} 
}
//creating the append function for the handler to use for logic
function appendToHistory(search) {
    //if there is not search input basically, return nothing i think?
    if (serchHistory.indexOf(search) !== -1) {
        return;
    }
    //push search up
    searchHistory.push(search);
    //take local storage data and stringify the json data from search History
    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    //render history now but calling the function 
    renderSearchHistory();
}

//function for the accurate displayed time and date
function renderCurrentWeather(city, weather) {
    var date = dayjs().format('M/D/YYYY');
    //create vars for required functionality
    var tempF = weather.temp;
  var windMph = weather.wind_speed;
  var humidity = weather.humidity;
  var uvi = weather.uvi;
  var iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
  var iconDescription = weather.weather[0].description || weather[0].main;
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var heading = document.createElement('h2');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');
  var uvEl = document.createElement('p');
  var uviBadge = document.createElement('button');
  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');
  heading.textContent = `${city} (${date})`;
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${tempF}°F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
  cardBody.append(heading, tempEl, windEl, humidityEl);
  uvEl.textContent = 'UV Index: ';
  uviBadge.classList.add('btn', 'btn-sm');
  if (uvi < 3) {
    uviBadge.classList.add('btn-success');
  } else if (uvi < 7) {
    uviBadge.classList.add('btn-warning');
  } else {
    uviBadge.classList.add('btn-danger');
  }

  uviBadge.textContent = uvi;
  uvEl.append(uviBadge);
  cardBody.append(uvEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}
function renderForecastCard(forecast) {
    // variables for data from api
    var unixTs = forecast.dt;
    var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var iconDescription = forecast.weather[0].description;
    var tempF = forecast.temp.day;
    var { humidity } = forecast;
    var windMph = forecast.wind_speed;
    var col = document.createElement('div');
    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var cardTitle = document.createElement('h5');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);

  col.setAttribute('class', 'col-md');
  col.classList.add('five-day-card');
  card.setAttribute('class', 'card bg-primary h-100 text-white');
  cardBody.setAttribute('class', 'card-body p-2');
  cardTitle.setAttribute('class', 'card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');
  cardTitle.textContent = dayjs.unix(unixTs).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;
//calling the function to append the forcast in the col via innnerhtml
  forecastContainer.append(col)
}

//creating a loop to give the full 5 day forecast and to append them 
function renderForecast(dailyForecast) {
    var startDt = dayjs().add(1, 'day').startOf('day').unix();
    var endDt = dayjs().add(6, 'day').startOf('day').unix();
    var headingCol = document.createElement('div');
    var heading = document.createElement('h4');
    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5-Day Forecast:';
    headingCol.append(heading);
    forecastContainer.innerHTML = '';
  forecastContainer.append(headingCol);
  for (var i = 0; i < dailyForecast.length; i++) {
    if (dailyForecast[i].dt >= startDt && dailyForecast[i].dt < endDt) {
        renderForecastCard(dailyForecast[i]);
      }
    }
  }
  //function to render all datat for the city date etc...
  function renderItems(city, data) {
    renderCurrentWeather(city, data.current);
    renderForecast(data.daily);
  }
//fetch request to the api via geo location 
  function fetchWeather(location) {
    var { lat } = location;
    var { lon } = location;
    var city = location.name;
    var apiUrl = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;
  
    fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

//function to fetch the cooridinates
function fetchCoords(search) {
    var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
  
    fetch(apiUrl)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (!data[0]) {
          alert('Location not found');
        } else {
          appendToHistory(search);
          fetchWeather(data[0]);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  //created a function to handle the form submit
  function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInput.value) {
      return;
    }
//fuction to render history 
//function to put fetch data on the page

//put in api key 
//pull out data from api, check key