const searchBtn = document.querySelector(".searchBtn");
const currentWeather = document.querySelector(".current-weather");
const card = document.querySelector(".card");
const forecast = document.querySelector(".forecast");


const cityInput = document.querySelector(".city-input");
const apiKey = "b15aeb961955ea92ceafd357638098e2";



const forecastWeekDisplay = (cityName, weatherDisplay, i) =>{

    if(i === 0){
        // Current Weather
        return `<div class="current-card">
                    <h1>${cityName} </h1>
                    <p>${((weatherDisplay.main.temp - 273.15)* 9/5 + 32).toFixed(1)}°F</p>
                    <p>Humidity: ${weatherDisplay.main.humidity}%</p>
                </div>`
    }else{
        // 5 Day Forecast
        return `<div class="card">
                    <h3>${weatherDisplay.dt_txt.split(" ")[0]}</h3>
                    <p>${((weatherDisplay.main.temp - 273.15)* 9/5 + 32).toFixed(1)}°F</p>
                    <p>Humidity: ${weatherDisplay.main.humidity}%</p>
                </div>`
    }

};

// Forecast data weather
 const getForecastWeek = (cityName, lat, lon) => {

    const fiveForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
   
    fetch(fiveForecast)
    
    .then(respone => respone.json())
    
    .then(data => {
        
        const newForecastDays = [];
        const fiveDayForecast = data.list.filter(forecast => {
            const dateOfDays = new Date(forecast.dt_txt).getDate();
            
            if(!newForecastDays.includes(dateOfDays)){
                return newForecastDays.push(dateOfDays);
            }
        });
        cityInput.value = "";

        
        currentWeather.innerHTML = "";
        forecast.innerHTML = "";
        
        console.log(data);
        currentWeather.style.display = "flex";
        forecast.style.display = "flex";
        


       
        fiveDayForecast.forEach((weatherDisplay, i) => {
            if(i === 0){
                currentWeather.insertAdjacentHTML("beforeend",forecastWeekDisplay(cityName, weatherDisplay, i));

            }else{
                forecast.insertAdjacentHTML("beforeend",forecastWeekDisplay(cityName, weatherDisplay, i));
            }
            
        });
        
    }).catch(() => {
        alert("catch error")
    });
    
}

// current weather data
const getWeatherData = () => {
    const cityName = cityInput.value;

    if(!cityName) return;
   const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    
   fetch(geoApiUrl)
   
   .then(respone => respone.json())
   
   .then(data => {
    
    if(!data.length) return alert("Didnt work");
    const {name, lat, lon} = data[0];
    getForecastWeek(name, lat, lon);
    
    }).catch(() => {
        alert("error");
    });
}
// click BTN
searchBtn.addEventListener("click", getWeatherData);

