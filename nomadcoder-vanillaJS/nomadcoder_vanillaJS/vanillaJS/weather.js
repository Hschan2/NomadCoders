const COORDS = 'coords';

const weather = document.querySelector(".js-weather");

const API_KEY = 'a03004bf971234fd4cb532f6df20b7af';

function getWeather(lat, lng) { // 날씨 API 가져오기
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`)
    .then(function(response) { // fetch를 완료하고 then 수행해라
        return response.json();
    })
    .then(function(json) {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temp}˚, ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // object를 string으로 변환
}

function handleGeoSucces(position) { // 좌표 가져왔을 경우
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() { // 좌표 못가져왔을 경우
    
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else { // 이미 좌표값이 있을 때
        // getWeather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();