export default function updateWeatherData(todaysWeather) {

    const clouds = document.getElementById("cloudy-value");
    const humidity = document.getElementById("humidity-value");
    const wind = document.getElementById("wind-value");

    clouds.textContent = `${todaysWeather.clouds.all}%`;
    humidity.textContent = `${todaysWeather.main.humidity}%`;
    wind.textContent = `${Number(todaysWeather.wind.speed * 3.6).toFixed(2)} Km/h`;
}