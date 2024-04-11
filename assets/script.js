const weatherForm = document.querySelector(".weatherForm");
const currenWeather = document.querySelector(".current-weather");
const card = document.querySelector(".card");
const cityInput = document.querySelector(".city-input").value;
const apiKey = "b15aeb961955ea92ceafd357638098e2";


weatherForm.addEventListener("submit", event => {

    event.preventDefault();

    if(!cityInput){
        displayError("Enter a city")
    }else{
        weatherData(cityInput);
        displayWeatherInfo(weatherInfo);
    };
});


function weatherData(city) {
   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
    
    .then(respone => {
        if(!respone.ok){
            displayError("Error")
        }else{
            return respone.json()
        };
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error)
       
    });

    console.log(respone);
} 





function displayError(message){

    const errorBox = document.createElement("p");
    errorBox.textContent = message;
    errorBox =classList.add("errorBox");

    // display on the card
    currenWeather.textContent = "";
    currenWeather.style.display = "flex";
    currenWeather.appendChild(errorBox);
}