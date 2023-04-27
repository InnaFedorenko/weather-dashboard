var requestUrl = 'https://dog-api.kinduff.com/api/facts?number=13';
//https://api.github.com/

//https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=6180d0bfb66b0a537a54cd4b60470c4d
//https://api.openweathermap.org/data/2.5/forecast?q=Roma&appid=6180d0bfb66b0a537a54cd4b60470c4d&units=imperial
var API_KEY = '6180d0bfb66b0a537a54cd4b60470c4d';

let cityName = '';
let searchBtn = '';
var cityBtnList = [];

function getCurrentWeather(city) {

    // https://api.openweathermap.org/data/2.5/weather?q=Roma&appid=6180d0bfb66b0a537a54cd4b60470c4d
    // https://api.openweathermap.org/data/2.5/weather?q=roma&appid=6180d0bfb66b0a537a54cd4b60470c4d


    //console.log('Get current weather for the city: '+ city);
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
    $.get(requestUrl, function (response) {
        var currentCity= city+' - '
       var currentDate = dayjs().format("MM/DD/YYYY");
        var todayData = response.list[0];
        var iconUrl = `https://openweathermap.org/img/w/${todayData.weather[0].icon}.png`;
        var tempF = 'Temp: '+todayData.main.temp+ '°F';
        var windSpeedMph = 'Wind: '+todayData.wind.speed+ 'MPH';
        var humidity = 'Humidity: '+todayData.main.humidity +'%';

        console.log('Citi is ' +city+' - ');
        console.log('Data is ' +currentDate);
        console.log('Icon is '+ iconUrl);
        console.log('Temp is' + tempF);
        console.log('Wind is'+windSpeedMph);
        console.log('Humidity is '+humidity);

        // Display the extracted data in the HTML
        $("#nameCurrent").text(currentCity);
        $("#dateCurrent").text(currentDate);
        $("#imgCurrent").attr("src", iconUrl);
        $("#tempCurrent").text(tempF);
        $("#windCurrent").text(windSpeedMph);
        $("#humidityCurrent").text(humidity);
    });
    //console.log(requestUrl);    
    // fetch(requestUrl)
    // .then(response => response.json())
    // .then(data => {
    //   const weatherData = `
    //     <p>Weather: ${data.weather[0].main}</p>
    //     <p>Description: ${data.weather[0].description}</p>
    //     <p>Temperature: ${data.main.temp} K</p>
    //     <p>Humidity: ${data.main.humidity}%</p>
    //   `;
    //   //document.getElementById('current-weather').innerHTML = weatherData; //replace jquery
    // })
    // .catch(error => console.error(error));
}







/**This function will get wether forecast for the city selcted by user from openweather API
 * inputFromField (string) - city name entered by user as a search criteria
 */
// function getCity(inputFromField){
//     // var inputFromField1 = 'atlanta';
//     // var  API_KEY = '6180d0bfb66b0a537a54cd4b60470c4d';
//     var url="https://api.openweathermap.org/geo/1.0/direct?q=" + inputFromField1 + "&limit=1&appid=6180d0bfb66b0a537a54cd4b60470c4" //use my appid
//     // fetch(url){
//     //     ...
//     // }
//     // .then(data){
//         data=[{"name":"Philadelphia","local_names":{"tr":"Filadelfiya","pl":"Filadelfia","oc":"Filadèlfia","ar":"فيلادلفيا","ja":"フィラデルフィア","pt":"Filadélfia","ko":"필라델피아","ur":"فلاڈیلفیا","en":"Philadelphia","fa":"فیلادلفیا","he":"פילדלפיה","es":"Filadelfia","fr":"Philadelphie","cs":"Filadelfie","be":"Філадэльфія","zh":"費城","ta":"பிலடெல்பியா","lv":"Filadelfija","uk":"Філадельфія","kn":"ಫಿಲಡೆಲ್ಫಿಯ","it":"Filadelfia","ru":"Филадельфия","ca":"Filadèlfia","hi":"फिलाडेल्फिया","te":"ఫిలడెల్ఫియా"},"lat":39.9527237,"lon":-75.1635262,"country":"US","state":"Pennsylvania"}]
//         var lat = data[0].lat;
//         var lon = data[0].lon;
//     console.log(lat + ", " + lon);
//     getWeatherCurrent(lat,lon);
//     // }
// }
// function getWeatherCurrent(lat, lon){

// console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=496722594d14437755a15609505942d8`)
// }




/**
 * This function  search city based on the user input and adding city button for predefined search
 */
function searchCity(button, city) {
    console.log(button + 'button clicked!' + city);
    getCurrentWeather(city);
    // renderCityButton(button, city);
    return;
}

function init() {
    // console.log('script is connected');
    // Define click event handlers for each button
    //ToDo - reads buttons from local storage

}
function renderCityButton(city) {
    // Create a new button element with text and an ID
    if ($.inArray(city, cityBtnList) !== -1) {
        return; // Exit the function
    } else {
        console.log('User input does not match any array values.');
        var newButton = $('<button>', {
            id: cityBtnList.length,
            class: 'btn btn-secondary',
            text: city
        });
        // Append the new button element to the list-group div
        $('.list-group').append(newButton);
        return;
        // Continue with the function
    }

}

$(document).ready(function () {
    init();
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
        //ToDo - execute weather search
    });
    $('.list-group button').each(function () {
        // 

        $(this).click(function () {
            searchBtn = $(this).attr('id');
            cityName = $(this).text();
            // console.log($(this).text()+' button is selected');
            searchCity(searchBtn, cityName);
            //ToDo - render new element
            //ToDo - execute weather search
        });
        //     // Get the ID of the button
        //     var buttonID = $(this).attr('id');
        //     // Get the text content of the button
        //     var buttonText = $(this).text();
        //     // Log the ID and text content of the button to the console
        //     console.log('Button ID: ' + buttonID + ', Text Content: ' + buttonText);
        //     searchCity(searchBtn, cityName);
    });
    return;
});
//getCity("philadelphia")
