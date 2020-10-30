
var weather = document.getElementById("weather");
console.log(weather);

var COORDS = "coords";

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=be2f9820c6286708f298276e996fa57d&units=metric`
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp.toFixed(0); //celsius rounded up!
        const temperature_murica = ((temperature * 9/5) + 32).toFixed(0); //fahrenheit rounded up!
        const place = json.name;
        weather.innerText = `${temperature}°C / ${temperature_murica}°F in ${place}`;
    });

}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //a small JS trick is to just write latitude (instead of latitude: latitude)
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access Geo Location")
}

function askForCoords(){ //using the geolocation API to get the client location
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();

}

init();
