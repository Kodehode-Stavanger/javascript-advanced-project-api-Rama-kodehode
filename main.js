const degrees = document.getElementById("degrees");
const degreesFeel = document.getElementById("degrees-feel");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const showLatitude = document.getElementById("latitude");
const showLongtitude = document.getElementById("longtitude");
const uv = document.getElementById("uv");
const airQuality = document.getElementById("airQuality");
const hour = document.getElementById("hour");
const temperature = document.getElementById("temperature");
const inputWeather = document.getElementById("weather-input");
const btnSubmit = document.getElementById("submit-btn");

btnSubmit.addEventListener("click", async () => {
  inputCountry = inputWeather.value.trim();
  let latitude = "";
  let longitude = "";

  try {
    const resultGeo = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${inputCountry}&count=1&language=en&format=json`
    );

    const dataGeo = await resultGeo.json();

    if (dataGeo.results.length > 0) {
      latitude = dataGeo.results[0].latitude;
      longitude = dataGeo.results[0].longitude;

      const resultWeather = await fetch(
        `https://api.open-meteo.com/v1/jma?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=is_day`
      );

      const dataWeather = await resultWeather.json();
      renderSite(dataGeo, dataWeather);
      console.log(dataWeather);
    }
  } catch (error) {
    console.log(error);
  }
  console.log(inputCountry);
});

function renderSite(dataGeo, dataWeather) {
  degrees.textContent = `${dataWeather.current.temperature_2m} DEGREES`;
  humidity.textContent = `HUMIDITY ${dataWeather.current.relative_humidity_2m}%`;
  wind.textContent = `WIND ${dataWeather.current.wind_speed_10m} ${dataWeather.current_units.wind_speed_10m}`;
  showLatitude.textContent = `LATITUDE ${dataWeather.latitude}`;
  showLongtitude.textContent = `LONGTITUDE ${dataWeather.longitude}`;

  const population = document.getElementById("population");
  const timeZone = document.getElementById("timezone");
  const country = document.getElementById("country");
  if (dataGeo.results.length > 0) {
    population.textContent =
      `POPULATION | ${dataGeo.results[0].population}`.toUpperCase();
    country.textContent = `${dataGeo.results[0].name}`.toUpperCase();
    timeZone.textContent =
      `CAPITAL*${dataGeo.results[0].timezone}`.toUpperCase();
  }
  console.log(dataGeo);
}
