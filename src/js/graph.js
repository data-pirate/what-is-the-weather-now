import getData from "./getData.js";
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: [],
    datasets: [{
        label: 'average temprature',
        data: [],
        fill: true,
        borderColor: 'rgb(226, 90, 0)',
    }]
};
const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const myChart = new Chart(ctx, config);

export default async function get5DayForcast(city) {
    const response = await getData(city);

    let nextDays = [];
    let nextDaysTemp = [];
    let todaysWeather = response['list'][0]['dt_txt'].split(' ')[1];
    let d = new Date();
    let count = 0;
    for (let each in response['list']) {
        if (response['list'][each]['dt_txt'] === `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() <= 9 ? '0'+ d.getDate(): d.getDate()} ${todaysWeather}`) {
            nextDays.push(days[d.getDay()].slice(0, 3));
            nextDaysTemp.push(Math.round(response['list'][each]['main']['temp'] - 273.15));
            d.setDate(d.getDate() + 1);
            count++;
        }
    }
    addData(myChart, nextDays, nextDaysTemp);

}

function addData(chart, label, data) {
    removeData(chart);
    chart.data.labels = label;
    chart.data.datasets.forEach(dataset => {
        dataset.data = data;
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}