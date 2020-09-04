var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-name");
var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var tempEl = document.querySelector("#temp");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var cityHistoryEl = document.querySelector("#search-history");
var dateOne = document.querySelector("#date1");
var dateTwo = document.querySelector("#date2");
var dateThree = document.querySelector("#date3");
var dateFour = document.querySelector("#date4");
var dateFive = document.querySelector("#date5");
var tempOne = document.querySelector("#temp1");
var tempTwo = document.querySelector("#temp2");
var tempThree = document.querySelector("#temp3");
var tempFour = document.querySelector("#temp4");
var tempFive = document.querySelector("#temp5");
var humidOne = document.querySelector("#humid1");
var humidTwo = document.querySelector("#humid2");
var humidThree = document.querySelector("#humid3");
var humidFour = document.querySelector("#humid4");
var humidFive = document.querySelector("#humid5");

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

// var getCityWeather = function (city) {
//     //format the github api url
//     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c0acf9a2d1becd72a92787658f4ca1e7"

//     //make request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             //request was successful
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     displayWeather(data);
//                     console.log(data);
//                 });
//             } else {
//                 alert("Error: " + response.statusText);
//             }
//         }).then(function(data) {
//             //store the lat lon to a variable
//             var lat = response.coord.lat
//             var lon = response.coord.lon
            
//             return fetch ("http://api.openweathermap.org/data/2.5/uvi/forecast?appid=c0acf9a2d1becd72a92787658f4ca1e7&lat=" + lat + "&lon=" + lon + "&cnt=1");

//         }).then(function (response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 return Promise.reject (response);
//             }
//         }).then(function(lat) {
//             console.log(data, lat);
//         }).then(function(lon) {
//             console.log(data.lon);
//         });
// };

var getFiveDay = function (city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=c0acf9a2d1becd72a92787658f4ca1e7"

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

    var histEl = document.createElement("p");
    histEl.classList = "display-history border";
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

    windEl.innerHTML = weather.wind.speed + " MPH";

    // uvIndexEl.innerHTML = weather
}

var displayFiveDay = function (weatherForecast) {
    
    console.log(weatherForecast.list);

    dateOne.innerHTML = weatherForecast.list[4].dt_txt;
    dateTwo.innerHTML = weatherForecast.list[12].dt_txt;
    dateThree.innerHTML = weatherForecast.list[20].dt_txt;
    dateFour.innerHTML = weatherForecast.list[28].dt_txt;
    dateFive.innerHTML = weatherForecast.list[36].dt_txt;

    tempOne.innerHTML = weatherForecast.list[4].main.temp;
    tempTwo.innerHTML = weatherForecast.list[12].main.temp;
    tempThree.innerHTML = weatherForecast.list[20].main.temp;
    tempFour.innerHTML = weatherForecast.list[28].main.temp;
    tempFive.innerHTML = weatherForecast.list[36].main.temp;

    humidOne.innerHTML = weatherForecast.list[4].main.humidity + "%";
    humidTwo.innerHTML = weatherForecast.list[12].main.humidity + "%";
    humidThree.innerHTML = weatherForecast.list[20].main.humidity + "%";
    humidFour.innerHTML = weatherForecast.list[28].main.humidity + "%";
    humidFive.innerHTML = weatherForecast.list[36].main.humidity + "%";
}

cityFormEl.addEventListener("submit",formSubmitHandler);
