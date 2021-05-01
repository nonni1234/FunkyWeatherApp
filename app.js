const apikey = "c0bd32b3ab26640600d6f7e7219aa84d";

function getIcon(iconid) {
    const id = parseInt(iconid);
    if (id == NaN) console.log("id failed");
    let bg = "red";
    let nafn;
    let source = "./icons/sun.svg";
    let night = false;
    if (id >= 200 && id <= 232) {
        // Thunderstorm
        nafn = "clouds";
        bg = "color";
    }
    else if (id >= 300 && id <= 321) {
        // Drizzle
        nafn = "rain"
        bg = "grey"
    }
    else if (id >= 500 && id <= 531) {
        // Rain
        nafn = "rain"
        bg = "grey";
    }
    else if (id >= 701 && id <= 781) {
        // Atmosphere
        nafn = "clouds";
        bg = "grey"; 
        
    }
    
    else if (id >= 800 && id <= 804) {
        switch (id) {
            case 800:
                nafn = "sun";
                bg = "yellow";
                break;
            case 801:
                nafn = "half-cloudy";
                bg = "grey";
                break;
            case 802:
            case 803:
                nafn = "cloud";
                bg = "grey";
                break;
            case 804:
                nafn = "fullcloud";
                bg = "grey";
                break;
        }
    } else {}

    if (!night) {
        source = `./icons/${nafn}.svg`;
    } else {
        // night source
        // kristinn er inspiration
        try {
        source = `./icons/${nafn+"n"}.svg`;
        } catch {
            source = `./icons/${nafn}.svg`;
        }
    }
    
    console.log(source);
    return {source,bg};
}

function Weather(weather) {
    const desc = weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1);;
    document.querySelector("#heat").textContent = Math.round(weather.main.temp)+"°";
    document.querySelector("#description").textContent = desc;
}

function getWeather(lat,lon) {
    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=${"metric"}`;
    const url = "./debugmanualedit.json";
    console.log("url: " + url);
    fetch(url).then((response) => {
        response.json().then((data) => {
            Weather(data);
            changeIcon(data.weather[0].id);
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
}// pussy

function changeIcon(id) {
    const { source, bg } = getIcon(id);
    console.log(id,source,bg);
    const icon = document.querySelector("#icon");
    try {
    icon.src = source;
    document.body.style.backgroundColor = bg;
    } catch {
        console.log("error with changing background, loading default values");
        icon.src = "./icons/sun.svg";
        document.body.style.backgroundColor = "cyan";
    }
}

getLocation();
