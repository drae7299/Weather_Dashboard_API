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
} 
//fuction to render history 
//function to put fetch data on the page

//put in api key 
//pull out data from api, check key