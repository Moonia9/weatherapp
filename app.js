// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appId)

const APIKey = "62e54303a7d54e5faad6eef0a03675e2";
const baseUrl = "https://api.weatherbit.io/v2.0/current?";
//const country_code = "ES";

// https://api.weatherbit.io/v2.0/current?lat=41.41&lon=2.19&key=62e54303a7d54e5faad6eef0a03675e2
//const URL = `${baseUrl}lat=${latitude}&lon=${longitude}&key=${APIKey}`;

//Input and Event Listener
const inputBox = document.querySelector(".input_box");
const btn = document.querySelector("#btn");
let city = inputBox.value;

btn.addEventListener("click", function () {
  city = inputBox.value.trim().toLowerCase();
  console.log(city);
});

function setEvent(event) {
  if (event.key) {
    callWeatherAPIPosition(inputBox.value);
    console.log(inputBox.value);
  }
}

const callWeatherAPIPosition = (longitude, latitude) => {
  const URL = `${baseUrl}lat=${latitude}&lon=${longitude}&key=${APIKey}`;
  const callFetchURL = fetch(URL)
    //if the call goes right || 200;
    .then((response) => response.json())
    .then((weather_info) => {
      console.log("First weather info", weather_info);
      showWeatherInfo(weather_info.data[0]);
    });
  //if the call goes wrong || 403, 404...;
  callFetchURL.catch((error) => {
    console.error("Something went wrong", error);
    return alert(`An error occured, ${error}`);
  });
};

const onPositionReceived = (position) => {
  const {
    coords: { latitude, longitude },
  } = position;
  console.log(latitude, longitude);
  callWeatherAPIPosition(longitude, latitude);
};

const onPositionDenied = (error) => {
  const { message } = error;
  console.log(error);
  const notificationDiv = document.getElementsByClassName("notification");
  const notification = notificationDiv[0];
  notification.style.display = "block";
  const p = document.createElement("p");
  p.innerText = message;
  notification.appendChild(p);
};

const showWeatherInfo = (weatherObject) => {
  console.log("Weather Info Element", weatherObject);

  const {
    city_name,
    country_code,
    temp,
    weather: { description, icon },
  } = weatherObject;

  //temperature description
  const descriptionP = document.querySelector(".temperature-description p");
  descriptionP.innerText = description;

  //location (city,country)
  const locationP = document.querySelector(".location p");
  locationP.innerText = `${city_name}, ${country_code}`;

  //the temperature value in Celsius
  const temperatureValueP = document.querySelector(".temperature-value p");
  temperatureValueP.innerHTML = `${temp} °<span>C</span>`;

  //we need the icon
  const weatherIconImg = document.querySelector(".weather-icon img");
  const iconWithoutTheFirstLetter = icon.slice(1);
  weatherIconImg.setAttribute("src", `icons/${iconWithoutTheFirstLetter}.png`);
};

const getUserPosition = () => {
  navigator.geolocation.getCurrentPosition(
    (location) => onPositionReceived(location),
    (error) => onPositionDenied(error)
  );
};

getUserPosition();
