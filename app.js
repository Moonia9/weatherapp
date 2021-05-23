// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appId)

const APIKey = "62e54303a7d54e5faad6eef0a03675e2";
const baseUrl = "https://api.weatherbit.io/v2.0/current?";
const country_code = "ES";
let filterLinedCitiesES = [];

// https://api.weatherbit.io/v2.0/current?lat=41.41&lon=2.19&key=62e54303a7d54e5faad6eef0a03675e2
//const URL = `${baseUrl}lat=${latitude}&lon=${longitude}&key=${APIKey}`;

const citiesES = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Malaga",
  "Oviedo",
  "Alicante",
  "Las Palmas",
  "Vigo",
  "Cordoba",
  "Pamplona",
  "Almeria",
  "Salamanca",
  "Leon",
  "Leida",
  "Toledo",
  "Marbella",
  "Manresa",
  "Zaragoza",
  "Palma de Mallorca",
  "Merida",
  "Santander",
  "Gijon",
  "Taragona",
  "Girona",
  "Reus",
  "Peruel",
  "Ventallo",
];

console.log("Cities from Spain :", citiesES);

const URL = (city) => {
  return `${baseUrl}city=${city}&country=${country_code}&key=${APIKey}`;
};

//Filter-line input
const inputBox = document.querySelector(".input-box");
const dataBox = document.querySelector(".data-box");
inputBox.addEventListener("keydown", setOrder);

function filterCities(onSearch) {
  dataBox.innerHTML = "";

  if (onSearch) {
    filterLinedCitiesES = cities.filter((city) =>
      city.toLowerCase().startsWith(onSearch)
    );

    if (filterLinedCitiesES.length) {
      filterLinedCitiesES.forEach((city) => {
        const p = document.createElement("p");
        const a = document.createElement("a");

        p.innerText = city;
        a.setAttribute("href", "#");
        p.onclick = () => {
          getInformation(city);
        };
        p.appendChild(a);
        dataBox.appendChild(p);
      });
    }
  }
}

function setOrder(e) {
  if (e.keyCode == 13) {
    getInformation(inputBox.value);
    console.log(inputBox.value);
  }
}

function getInformation(city) {
  console.log("This is the information about", city);
  fetch(URL(city))
    .then((weather_info) => {
      return weather_info.json();
    })
    .then(renderInfo)
    .catch((error) => {
      return alert(`An error has occured: ${error}`);
    });
}

function renderInfo(weather) {
  console.log(weather);

  //temperature information
  const temperatureValue = document.querySelector(".temperature");
  temperatureValue.innerText = `${weather.data[0].temp.toFixed()}°C`;

  //location (city)
  const city = document.querySelector(".location .city-name");
  city.innerText = `${weather.data[0].city_name},${weather.data[0].country_code}`;

  //description (weather information)
  const description = document.querySelector(".weather-info");
  description.innerText = `${weather.data[0].weather.description}`;

  //current date
  const date = document.querySelector(".location .current-date");
  date.innerText = new Date().toLocaleDateString();
}


//Weather-Application showing the Current Position of the user

// function filterLinedCitiesES(onSearch) {
//   inputBox.innerHTML = " ";
//   if (onSearch)
//     filterLinedCitiesES = citiesES.filter((city) =>
//       city.toLowerCase().startsWith(onSearch)
//     );
//   if (filterLinedCitiesES.length) {
//     filterLinedCitiesES.forEach((element) => {
//       const p = document.createElement("p");
//       const a = document.createElement("a");
//       p.innerText = element;
//       a.setAttribute("href", "#");
//       p.onclick = () => {
//         callWeatherAPIPosition.appendChild(p);
//       };
//     });
//   }
// }

// function setEventFilter(e) {
//   filterLinedCitiesES(inputBox.value);

//   if (e.key) {
//     callWeatherAPIPosition(inputBox.value);
//   }
// }

// btn.addEventListener("click", function () {
//   city = inputBox.value;
//   console.log(city);
// });

// function setEvent(event) {
//   if (event.key) {
//     callWeatherAPIPosition(inputBox.value);
//     console.log(inputBox.value);
//   }
// }

// const callWeatherAPIPosition = (longitude, latitude) => {
//   const URL = `${baseUrl}lat=${latitude}&lon=${longitude}&key=${APIKey}`;
//   const callFetchURL = fetch(URL)
//     //if the call goes right || 200;
//     .then((response) => response.json())
//     .then((weather_info) => {
//       console.log("First weather info", weather_info);
//       showWeatherInfo(weather_info.data[0]);
//     });
//   //if the call goes wrong || 403, 404...;
//   callFetchURL.catch((error) => {
//     console.error("Something went wrong", error);
//     return alert(`An error occured, ${error}`);
//   });
// };

// const onPositionReceived = (position) => {
//   const {
//     coords: { latitude, longitude },
//   } = position;
//   console.log(latitude, longitude);
//   callWeatherAPIPosition(longitude, latitude);
// };

// const onPositionDenied = (error) => {
//   const { message } = error;
//   console.log(error);
//   const notificationDiv = document.getElementsByClassName("notification");
//   const notification = notificationDiv[0];
//   notification.style.display = "block";
//   const p = document.createElement("p");
//   p.innerText = message;
//   notification.appendChild(p);
// };

// const showWeatherInfo = (weatherObject) => {
//   console.log("Weather Info Element", weatherObject);

//   const {
//     city_name,
//     country_code,
//     temp,
//     weather: { description, icon },
//   } = weatherObject;

//   //temperature description
//   const descriptionP = document.querySelector(".temperature-description p");
//   descriptionP.innerText = description;

//   //location (city,country)
//   const locationP = document.querySelector(".location p");
//   locationP.innerText = `${city_name}, ${country_code}`;

//   //the temperature value in Celsius
//   const temperatureValueP = document.querySelector(".temperature-value p");
//   temperatureValueP.innerHTML = `${temp} °<span>C</span>`;

//   //we need the icon
//   const weatherIconImg = document.querySelector(".weather-icon img");
//   const iconWithoutTheFirstLetter = icon.slice(1);
//   weatherIconImg.setAttribute("src", `icons/${iconWithoutTheFirstLetter}.png`);
// };

// const getUserPosition = () => {
//   navigator.geolocation.getCurrentPosition(
//     (location) => onPositionReceived(location),
//     (error) => onPositionDenied(error)
//   );
// };

// getUserPosition();
