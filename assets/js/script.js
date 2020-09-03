var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var cityHistoryEl = document.querySelector("#search-history");
var fiveDayDate = document.querySelector("#date");

// var uvIndexEl = document.querySelector("#uv");
var citySearch = [];

var getCityWeather = function (city) {
    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c0acf9a2d1becd72a92787658f4ca1e7"

    //make request to the url
    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
};

var getFiveDay = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=c0acf9a2d1becd72a92787658f4ca1e7"

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayFiveDay(data);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
};

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCityWeather(cityName);
        getFiveDay(cityName);
        searchHistory(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name.");
    }

    $(weatherContainerEl).removeClass("hide");
};

var searchHistory = function (cityName) {
    citySearch.push(cityName);
    console.log(citySearch);

    var histEl = document.createElement("p");
    histEl.classList = "display-history";
    histEl.textContent = cityName;

    histEl.setAttribute("onclick", "searchHistoryWeather(this);");

    cityHistoryEl.appendChild(histEl);
};

var searchHistoryWeather = function(ele) {
    var cityName = ele.innerHTML;

    getCityWeather(cityName);
};

var displayWeather = function (weather) {
    citySearchTerm.innerHTML = weather.name + " " + moment().format("MM[/]DD[/]YYYY");

    tempEl.innerHTML = weather.main.temp;

    humidityEl.innerHTML = weather.main.humidity + "%";

    windEl.innerHTML = weather.wind.speed;

    // uvIndexEl.innerHTML = weather
}

var displayFiveDay = function (weatherForecast) {
    console.log(weatherForecast);
    // console.log(weatherForecast.list);
    for (var i = 0; i < 4; i++) {
        console.log(weatherForecast.list[i]);
        // console.log(weatherForecast.list[i].dt_txt);
        // fiveDayDate.innerHTML = weatherForecast.list[i].dt_txt;


    }
}

cityFormEl.addEventListener("submit",formSubmitHandler);
