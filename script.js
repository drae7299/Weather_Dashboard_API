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
//fuction to render history 
//function to put fetch data on the page

//put in api key 
//pull out data from api, check key