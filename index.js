const cityForm = document.querySelector(".form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  const { cityDetails, weather } = data;

  // Update details Template
  details.innerHTML = `
    <h5 class="my-5">${cityDetails.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
                `;

  //update icons and images of day and night
  let timeSrc = null;
  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");

  time.setAttribute("src", timeSrc);
  // remove d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
  // Icons
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

cityForm.addEventListener("submit", (e) => {
  // prevent default action on submit
  e.preventDefault();

  //   get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with the city
  updateCity(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));

  // LocalStorage
  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUi(data))
    .then((err) => console.log("Error"));
}
