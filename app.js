const apikey = "c0bd32b3ab26640600d6f7e7219aa84d";

function getWeather(lat,lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${"metric"}`;
    console.log("url: " + url);
    fetch(url).then((response) => {
        response.json().then((data) => {
            printWeatherOfLocation(data);
        })
    }).catch((err) => {console.log("Fetch error: "+err )})
};

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
          getWeather(location.coords.latitude,location.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser :(");
    }
}
function printWeatherOfLocation(weather) {
    console.log(weather);
}

document.querySelector("button").addEventListener("click",getLocation);