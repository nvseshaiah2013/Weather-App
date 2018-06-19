"use strict";
function activate()
{
    document.getElementById('city').style.backgroundColor='yellow';
}
function deactivate()
{
    document.getElementById('city').style.backgroundColor='white';
}
function btnClick()
{
    alert('Hello World');
}
var searchBtn = document.querySelector('button');
var searchCity = document.querySelector('#city');
var loadingText = document.querySelector('#load');
var weatherBox = document.querySelector('#weather');
var weatherCity = weatherBox.firstElementChild;
var weatherDescription = weatherCity.nextElementSibling;//document.querySelector('#weatherDescription');
var weatherTemperature = weatherBox.lastElementChild;
searchCity.addEventListener('focus',activate);
searchCity.addEventListener('blur',deactivate);
searchBtn.addEventListener('click',searchWeather);
function Weather(cityName,description)
{
    this.cityName =cityName;
    this.description = description;
    this._temperature = '';
}
Object.defineProperty(Weather.prototype,'temperature',{
get:function()
{
    return this._temperature;
},
set:function(value)
{
    this._temperature = value +' C';
}
});

function searchWeather()
{
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if(cityName.trim().length==0)
    {
        return alert('Please enter the city Name');
    }
    var http = new XMLHttpRequest();
    var apiKey='USE_YOUR_API_KEY_HERE';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityName + '&units=metric&appid='+apiKey;
    var method = 'GET';
    http.open(method,url);
    http.onreadystatechange = function()
    {
        if(http.readyState === XMLHttpRequest.DONE && http.status===200)
        { 
            var data =JSON.parse(http.responseText);
            var weatherData = new Weather(cityName,data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        }
        else if(http.readyState === XMLHttpRequest.DONE)
            {
                return alert('Something Went Wrong!!');
            }
        
    }
    http.send();
}
function updateWeather(weatherData)
{
weatherCity.textContent = weatherData.cityName;
weatherDescription.textContent = weatherData.description;
weatherTemperature.textContent = weatherData.temperature;
loadingText.style.display = 'none';
weatherBox.style.display = 'block';
}