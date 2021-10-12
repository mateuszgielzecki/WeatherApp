const searchInput = document.querySelector('.weather-search__input');
const searchIcon = document.querySelector('.weather-search__icon');
const locationCity = document.querySelector('.location-city');
const weatherDescription = document.querySelector('.description');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.air-humidity');
const icon = document.querySelector('.icon');
const locationHour = document.querySelector('.location-hour')

const getWeatherData = function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd83f143dfb68bc132336480ad98d6fd`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setInformation(data);

        }).catch(err => errorRender())
}

const setInformation = function (data) {
    locationCity.classList.remove('error');
    locationHour.classList.remove('error-hidden');
    locationCity.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description.toUpperCase();
    windSpeed.textContent = (data.wind.speed).toFixed() + ' mph';
    humidity.textContent = data.main.humidity + '%';
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    setTemperature(data.main.temp);

    const date = new Date().toLocaleTimeString();
    locationHour.textContent = date
    searchInput.value = '';
}

const setTemperature = function (temp) {
    temperature.textContent = '';
    temperature.insertAdjacentHTML('beforeend', `${+(temp - 273.15).toFixed()}<span>&#8451;</span>`);
}

const getInput = function (e) {
    e.preventDefault();
    const input = searchInput.value;
    getWeatherData(input);
}

searchIcon.addEventListener('click', getInput)
window.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        getInput(e)
    } else return
})

const errorRender = function () {
    locationCity.textContent = 'Sorry, i cannot find this place... :(';
    searchInput.value = '';
    locationCity.classList.add('error');
    locationHour.classList.add('error-hidden');

    resetInfromation();


}

const resetInfromation = function () {
    temperature.textContent = '0℃';
    windSpeed.textContent = '0 mph';
    humidity.textContent = '0%';
    icon.src = 'img/Weather Icons/cloud.svg';
    weatherDescription.textContent = 'DESCRIPTION';
}


const date = new Date().toLocaleTimeString();
locationHour.textContent = date
console.log(date);


// const currentDate = date.getDay() + ':' + date.getMonth();
// // const time = date.getHours() + ':' + date.getMinutes();
// Date.prototype.today = function () {
//     return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
// }

// var newDate = new Date();
// var datetime = "LastSync: " + newDate.today() + " @ " + newDate.timeNow();


// console.log(datetime);

// - Dodać funkcjonalność zegara na podstawie współrzędnych dla wpisanego miasta 
// - Dodać funkcjnonalość wyświetlania pogody dla aktualnej lokalizacji 

// Opcjonalnie:
// - zmienić ikony przedstawiające pogodę 