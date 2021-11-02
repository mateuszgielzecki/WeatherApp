const searchInput = document.querySelector('.weather-search__input');
const searchIcon = document.querySelector('.weather-search__icon');
const locationCity = document.querySelector('.location-city');
const weatherDescription = document.querySelector('.description');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.air-humidity');
const icon = document.querySelector('.icon');

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
    locationCity.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description.toUpperCase();
    windSpeed.textContent = (data.wind.speed).toFixed() + ' mph';
    humidity.textContent = data.main.humidity + '%';
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    setTemperature(data.main.temp);

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

    resetInfromation();


}

const resetInfromation = function () {
    temperature.textContent = '0℃';
    windSpeed.textContent = '0 mph';
    humidity.textContent = '0%';
    icon.src = 'img/Weather Icons/cloud.svg';
    weatherDescription.textContent = 'DESCRIPTION';
}




