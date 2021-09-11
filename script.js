const APIKEY = "e87845a5d20b43598e0121700212408";
const input = document.getElementById("input-search");
const temp = document.getElementById("temp");
const tempBlock = document.getElementById("tempBlock");

const url = (location) =>
  `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${location}&days=10&aqi=no&alerts=no`;

function getWeekDay() {
  let date = Date.now();
  const options = { weekday: "short" };
  const currentDay = new Intl.DateTimeFormat("en-US", options).format(date);

  return currentDay;
}
function currentTime() {
  let date = Date.now();
  let minutes = Math.floor(date / 1000 / 60) % 60;
  let hours = (Math.floor(date / 1000 / 3600) + 3) % 24;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  time = hours + ":" + minutes;

  return time;
}

async function getWeatherByLocation(location) {
  const resp = await fetch(url(location));
  const respData = await resp.json();

  contentEl = document.getElementById("content");
  contentEl.innerHTML = `
  <div class="content__location" id="location">${respData.location.name}</div>
  <p class="content__day">${getWeekDay()}</p>
  <p class="content__time">${currentTime()}</p>
  <div class="content__temperature" id="tempBlock">
      <p class="temperature" id="temp">${respData.current.temp_c + "°"}</p>
      <img 
        src = "${respData.current.condition.icon}"
        class="weather-img"/>     
  </div>`;

  const forecastTab = contentEl.appendChild(document.createElement("div"));
  forecastTab.setAttribute("class", "forecast__tab");
  respData.forecast.forecastday.forEach((element) => {
    const now = new Date(element.date);
    shotrName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      now
    );

    const forecastEl = forecastTab.appendChild(document.createElement("div"));
    forecastEl.setAttribute("class", "forecast__day");
    forecastEl.innerHTML = `
    <img
        src = "${element.day.condition.icon}"
        class="forecast-img"
    />
    <p class="forecast__temp">${element.day.maxtemp_c + "°"}</p>
    <p class="forecast__day">${shotrName}</p>
    `;
  });

  respData.forecast.forecastday.forEach((element) => {
    const now = new Date(element.date);
    shortName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      now
    );

    const forecastEl = forecastTab.appendChild(document.createElement("div"));
    forecastEl.setAttribute("class", "forecast__day");
    forecastEl.innerHTML = `
    <img
        src = "${element.day.condition.icon}"
        class="forecast-img"
    />
    <p class="forecast__temp">${element.day.maxtemp_c + "°"}</p>
    <p class="forecast__day">${shortName}</p>
    `;
  });
  return console.log(respData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let location = input.value;
  if (location) {
    getWeatherByLocation(location);
    input.value = "";
  }
});
