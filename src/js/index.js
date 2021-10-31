import "../css/style.css";
import "./graph.js"
import moment from 'moment';
import getData from './getData.js';
import get5DayForcast from "./graph.js";
import updateWeatherData from "./userData.js";



let data = {

    bgImages: {
        mist: "https://thumbs.gfycat.com/AcclaimedPracticalIslandwhistler.webp",
        clouds: "https://i.gifer.com/fyDi.gif",
        clear: "https://cdn.lowgif.com/full/c653b4915a24bcd3-.gif",
        thunderstorm: "https://i.gifer.com/Rnim.gif",
        drizzle: "https://acj.shorthandstories.com/Yaashclimatechangestory/assets/cWlogy6JUf/giphy.gif",
        snow: "https://i.imgur.com/HcIdxHv.gif",
        rain: "https://i.pinimg.com/originals/43/b0/06/43b006b10354452fad26160dd99a7eeb.gif",
    },
    temprature: "14",
    weather: "Today is a rainy day",
    tip: {
        clouds: "Don't forget an Umbrella",
        rain: "Don't forget an Umbrella",
        mist: "Slow down and allow extra time to reach your destination",
        thunderstorm: "Stay inside and Watch some movies",
        drizzle: "Don't forget an Umbrella",
        snow: "Stay inside, Don't catch cold",
        else: "Enjoy Your Day"
    },
    location: "san",
    time: moment().format('LLL')

}

const extractInfo = (serverData, todaysWeather) => {
    data.temprature = Math.round(todaysWeather.main.temp - 273.15);
    data.location = `${serverData.city.name}, ${serverData.city.country}`;
    let weather = todaysWeather.weather[0].description;
    console.log(todaysWeather.weather[0].main);
    data.weather = weather[0].toUpperCase() + weather.slice(1);
}


async function updateWeather(city) {
    let res = await getData(city);

    const weatherData = document.querySelector("body");
    const temprature = document.querySelector("#temprature");
    const location = document.querySelector(".location");
    const weather = document.querySelector("#weather-today");
    const date = document.querySelector("#date");
    const tip = document.querySelector("#tip-today");

    let todaysWeather = res['list'][0];
    extractInfo(res, todaysWeather);

    temprature.textContent = data.temprature;
    location.textContent = data.location;
    weather.textContent = data.weather;
    date.textContent = data.time;
    let ws = todaysWeather.weather[0].main.toLowerCase();
    if (ws === "clouds" || ws === "rain") {
        document.querySelector(".data").style.color = 'White';
        document.querySelector(".search-field").style.color = 'white';
    } else {
        document.querySelector(".data").style.color = 'rgb(31, 24, 24)';
        document.querySelector(".search-field").style.color = 'rgb(31, 24, 24)';
    }
    let bg = data.bgImages[ws] || data.bgImages.clear;
    weatherData.style.backgroundImage = `url(${bg})`;


    tip.textContent = data.tip[ws] || data.tip.else;
    get5DayForcast(city);
    updateWeatherData(todaysWeather);
}

updateWeather('san fransisco');




const button = document.querySelector(".search-button");
const searchField = document.querySelector("#cityname");


document.querySelector(".container").addEventListener("click", (e) => {
    if (e.target.classList.contains("search-button") || e.target.classList.contains("search-logo")) {
        if (searchField.value) {
            updateWeather(searchField.value);
        } else {
            searchField.classList.add("show-field")
        }
    } else if (!e.target.classList.contains("search-field")) {
        searchField.value = "";
        searchField.classList.remove("show-field")
    }
});