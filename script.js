const searchbox = document.getElementById("search");

const api = {
  key: "PUT YOUR KEY HERE",
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const displayResults = (weather) => {
  const city = document.querySelector(".location .city");
  const now = new Date();
  const date = document.querySelector(".location .date");
  const temp = document.querySelector(".current .temp");
  const weatherEl = document.querySelector(".current .weather");
  const hilow = document.querySelector(".current .hi-low");

  if (weather.cod === "404") {
    city.innerText = "City Not Found";
    date.innerText = "";
    temp.innerHTML = "";
    weatherEl.innerText = "";
    hilow.innerText = "";
  } else {
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(now);
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weatherEl.innerText = `${weather.weather[0].main}`;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
      weather.main.temp_max
    )}°C`;
  }
};

const getResults = (query) => {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((res) => {
      return res.json();
    })
    .then(displayResults);
};

const setQuery = (event) => {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
};

searchbox.addEventListener("keypress", setQuery);
