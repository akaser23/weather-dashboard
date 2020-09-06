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
var uvIndexEl = document.querySelector("#uv");
var citySearch = [];

// var loadedHist = localStorage.getItem()

var getCityWeather = function (city) {
    //format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c0acf9a2d1becd72a92787658f4ca1e7"

    //make request to the url
    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data);

                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    
                    fetch("https://api.openweathermap.org/data/2.5/uvi?appid=c0acf9a2d1becd72a92787658f4ca1e7&lat="
                    + lat 
                    + "&lon="
                    +lon)
                    .then(function(response) {
                        if(response.ok) {
                            response.json().then(function(data) {
                                displayUv(data.value);
                            })
                        }
                    });
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
};

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

    cityHistoryEl.prepend(histEl);

    localStorage.setItem("City", JSON.stringify(citySearch));
};

var searchHistoryWeather = function(ele) {
    var cityName = ele.innerHTML;

    getCityWeather(cityName);
    getFiveDay(cityName);
};

var displayWeather = function (weather) {
    citySearchTerm.innerHTML = weather.name + " " + moment().format("MM[/]DD[/]YYYY");

    var iconcode = weather.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#icon').attr('src', iconUrl);

    tempEl.innerHTML = Math.round((weather.main.temp - 273.15) * (9/5) + 32) + "&deg; F";

    humidityEl.innerHTML = weather.main.humidity + "%";

    windEl.innerHTML = weather.wind.speed + " MPH";
}

var displayUv = function (uvIndex) {

    uvIndexEl.innerHTML = uvIndex;
    $(uvIndexEl).removeClass("low").removeClass("moderate").removeClass("high");

    if (uvIndex < 4) {
        $(uvIndexEl).addClass("low");
    }
    else if (uvIndex < 8 && uvIndex > 4) {
        $(uvIndexEl).addClass("moderate"); 
    }
    else {
        $(uvIndexEl).addClass("high");  
    }

};

var displayFiveDay = function (weatherForecast) {
    
    console.log(weatherForecast.list);

    dateOne.innerHTML = weatherForecast.list[4].dt_txt.slice(0,10);
    dateTwo.innerHTML = weatherForecast.list[12].dt_txt.slice(0,10);
    dateThree.innerHTML = weatherForecast.list[20].dt_txt.slice(0,10);
    dateFour.innerHTML = weatherForecast.list[28].dt_txt.slice(0,10);
    dateFive.innerHTML = weatherForecast.list[36].dt_txt.slice(0,10);

    var iconcodeOne = weatherForecast.list[4].weather[0].icon;
    var iconUrlOne = "http://openweathermap.org/img/w/" + iconcodeOne + ".png";
    $('#icon-one').attr('src', iconUrlOne);

    var iconcodeTwo = weatherForecast.list[12].weather[0].icon;
    var iconUrlTwo = "http://openweathermap.org/img/w/" + iconcodeTwo + ".png";
    $('#icon-two').attr('src', iconUrlTwo);

    var iconcodeThree = weatherForecast.list[20].weather[0].icon;
    var iconUrlThree = "http://openweathermap.org/img/w/" + iconcodeThree + ".png";
    $('#icon-three').attr('src', iconUrlThree);

    var iconcodeFour = weatherForecast.list[28].weather[0].icon;
    var iconUrlFour = "http://openweathermap.org/img/w/" + iconcodeFour + ".png";
    $('#icon-four').attr('src', iconUrlFour);

    var iconcodeFive = weatherForecast.list[36].weather[0].icon;
    var iconUrlFive = "http://openweathermap.org/img/w/" + iconcodeFive + ".png";
    $('#icon-five').attr('src', iconUrlFive);

    tempOne.innerHTML = Math.round((weatherForecast.list[4].main.temp - 273.15) * (9/5) + 32) + "&deg; F";
    tempTwo.innerHTML = Math.round((weatherForecast.list[12].main.temp - 273.15) * (9/5) + 32) + "&deg; F";
    tempThree.innerHTML = Math.round((weatherForecast.list[20].main.temp - 273.15) * (9/5) + 32) + "&deg; F";
    tempFour.innerHTML = Math.round((weatherForecast.list[28].main.temp - 273.15) * (9/5) + 32) + "&deg; F";
    tempFive.innerHTML = Math.round((weatherForecast.list[36].main.temp - 273.15) * (9/5) + 32) + "&deg; F";

    humidOne.innerHTML = weatherForecast.list[4].main.humidity + "%";
    humidTwo.innerHTML = weatherForecast.list[12].main.humidity + "%";
    humidThree.innerHTML = weatherForecast.list[20].main.humidity + "%";
    humidFour.innerHTML = weatherForecast.list[28].main.humidity + "%";
    humidFive.innerHTML = weatherForecast.list[36].main.humidity + "%";
}

cityFormEl.addEventListener("submit",formSubmitHandler);