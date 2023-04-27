
//https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=6180d0bfb66b0a537a54cd4b60470c4d
//https://api.openweathermap.org/data/2.5/forecast?q=Roma&appid=6180d0bfb66b0a537a54cd4b60470c4d&units=imperial
var API_KEY = '6180d0bfb66b0a537a54cd4b60470c4d';

let cityName = '';
let searchBtn = '';
var cityBtnList = [];

function getCurrentWeather(city) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
    $.get(requestUrl, function (response) {
        var currentCity = city + ' - '
        var todayData = response.list[0];
        var currentDate = dayjs(todayData.dt_txt).format('MM/DD/YYYY');
        var iconUrl = `https://openweathermap.org/img/w/${todayData.weather[0].icon}.png`;
        var tempF = 'Temp: ' + todayData.main.temp + '°F';
        var windSpeedMph = 'Wind: ' + todayData.wind.speed + 'MPH';
        var humidity = 'Humidity: ' + todayData.main.humidity + '%';
        // Display the extracted data in the Current Weather html section
        $("#nameCurrent").text(currentCity);
        $("#dateCurrent").text(currentDate);
        if ($("#imgCurrent").length > 0) {
            // If there are, remove them
            $("#imgCurrent").remove();
        }
        var icon = $('<img>').addClass('card-img-top weather-img mr-5 mb-0').attr('src', iconUrl).attr('alt', 'weather icon').attr('id', 'imgCurrent');
        $('#current-flex-box').append(icon);
        $("#tempCurrent").text(tempF);
        $("#windCurrent").text(windSpeedMph);
        $("#humidityCurrent").text(humidity);

        if ($("#five-days-weather .card").length > 0) {
            // If there are, remove them
            $("#five-days-weather .card").remove();
            $("#five-days-weather").remove();
        }
        //Get data for next five days
        var div = $('<div>').attr('id', 'five-days-weather').addClass('d-flex flex-wrap justify-content-between align-items-center border-2-purple');
        $('#parrentDiv').append(div);
        // Extract data for the next 5 days
        for (var i = 1; i <= 5; i++) {
            var forecastData = response.list[i * 8 - 1];
            // console.log('forecastData '+forecastData.dt_txt); 
            var date = dayjs(forecastData.dt_txt).format('MM/DD/YYYY');
            var forecastIconUrl = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;
            var forecastTempF = forecastData.main.temp;
            var forecastWindSpeedMph = forecastData.wind.speed;
            var forecastHumidity = forecastData.main.humidity;
            //create cards container
            var card = $('<div>').addClass('card col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-2');
            var cardBody = $('<div>').addClass('card-body');
            var date = $('<h5>').addClass('card-date').text(date).attr('id', 'forecast-date-' + i);
            var icon = $('<img>').addClass('card-img-top weather-img mr-5 mb-0').attr('src', forecastIconUrl).attr('alt', 'weather icon').attr('id', 'forecast-icon-' + i);
            var temp = $('<p>').addClass('card-temp').text('Temp: ' + forecastTempF + '°F').attr('id', 'forecast-temp-f-' + i);
            var wind = $('<p>').addClass('card-wind').text('Wind: ' + forecastWindSpeedMph + 'MPH').attr('id', 'forecast-wind-mph-' + i);
            var humidity = $('<p>').addClass('card-humidity').text('Humidity: ' + forecastHumidity + '%').attr('id', 'forecast-humidity-' + i);
            cardBody.append(date, icon, temp, wind, humidity);
            card.append(cardBody);
            div.append(card);
            $('#five-days-weather').append(div);

        }
    }).fail(function (xhr, status, error) {
        var response = xhr.responseJSON;
        if (response && response.cod && response.cod !== '200') {
            alert("Error: " + response.message);
        } else {
            alert("Error: " + error);
        }
    });
    return;
}

/**
 * This function  search city based on the user input and adding city button for predefined search
 */
function searchCity(button, city) {
    // console.log(button + 'button clicked!' + city);
    getCurrentWeather(city);
    // renderCityButton(button, city);
    return;
}

function renderCityButton(city) {
    // Create a new button element with text and an ID
    if ($.inArray(city, cityBtnList) !== -1) {
        return; // Exit the function
    } else {
        var newButton = $('<button>', {
            id: cityBtnList.length,
            class: 'btn btn-secondary',
            text: city
        });
        // Add the onclick event to the new button

        // Append the new button element to the list-group div
        $('.list-group').append(newButton);
        return;
    }

}
function init() {
    console.log('read data from local Storage');
    var cityBtnList = JSON.parse(localStorage.getItem('searchHistory'));
    console.log(cityBtnList);
    // Generate buttons for each city name
    for (var i = 0; i < cityBtnList.length; i++) {
        var cityName = cityBtnList[i];
        console.log(cityName);
        var newButton = $('<button>', {
            id: i,
            class: 'btn btn-secondary',
            text: cityName
        });
        // Append the new button element to the list-group div
        $('.list-group').append(newButton);
     }
    return;
}

$(document).ready(function () {
    init();
    // console.log('other buttons list 0');
    $('#searchBtn').click(function () {
        //console.log('search button is selected - 0');
        searchBtn = $(this).attr('id');
        cityName = $('#searchInput').val();
        if (!cityName) return;
        //This function adds new button with the city name from user search
        renderCityButton(cityName);
        // Update array with city names
        cityBtnList.push(cityName);
        // save city names to local storage
        localStorage.setItem('searchHistory', JSON.stringify(cityBtnList));
        //This function initiates weather search
        searchCity(searchBtn, cityName);
        // Clear user input
        cityName = '';
        $('#searchInput').val(cityName);
        return;
    });
});

$("#buttons-list").on("click", "button", function () {
    var buttonId = $(this).attr("id");
    var cityName = $(this).html();
    searchCity(buttonId, cityName);

});
