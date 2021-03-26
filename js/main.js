//Weather
const api = {
    key: "e417af06ade81a23148372e5efe25ccc",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

//Exchange rate
const RATE_API = {
    api: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
}

$.getJSON(`${RATE_API.api}`,
    function (data) {
        let usdCoursSale = data[0].sale;
        let usdCoursBuy = data[0].buy;
        let eurCoursSale = data[1].sale;
        let eurCoursBuy = data[1].buy;
        let rurCoursSale = data[2].sale;
        let rurCoursBuy = data[2].buy;

        $(".usdCoursBuy").append(usdCoursBuy);
        $(".usdCoursSale").append(usdCoursSale);
        $(".eurCoursBuy").append(eurCoursBuy);
        $(".eurCoursSale").append(eurCoursSale);
        $(".rurCoursBuy").append(rurCoursBuy);
        $(".rurCoursSale").append(rurCoursSale);
    });

//Clock
const secDiv = document.getElementById('sec');
const minDiv = document.getElementById('min');
const hourDiv = document.getElementById('hour');

setInterval(updateClock, 1000);

function updateClock(){
    let date = new Date();
    let sec = date.getSeconds() / 60;
    let min = (date.getMinutes() + sec) / 60;
    let hour = (date.getHours() + min) / 12;

    secDiv.style.transform = "rotate(" + (sec * 360) + "deg)";
    minDiv.style.transform = "rotate(" + (min * 360) + "deg)";
    hourDiv.style.transform = "rotate(" + (hour * 360) + "deg)";
}

updateClock();

//Calculator

function back(){
    let exp = document.calculatrice.textview.value;
    document.calculatrice.textview.value = exp.substring(0,exp.length-1);
}



