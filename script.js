fetch("https://api.openweathermap.org/data/2.5/weather?q=Toronto,CA&appid=bd83f143dfb68bc132336480ad98d6fd")
    .then(res => res.json())
    .then(res => {
        const temp = +(res.main.temp - 273.15).toFixed(1);
        const tempMax = +(res.main.temp_max - 273.15).toFixed(1);
        const tempMin = +(res.main.temp_min - 273.15).toFixed(1);
        const tempFeels = +(res.main.feels_like - 273.15).toFixed(1);
        const name = res.name;
        const humidity = res.main.humidity;
        const weatherDesc = res.weather[0].description;
        const weatherMain = res.weather[0].main;
        const wind = res.wind.speed
        console.log(weatherDesc);
        console.log(res);

    })
    .catch(error => console.log("Błąd: ", error))


// 1. Temperatura w C i F 
// 2. Wilgotność 

