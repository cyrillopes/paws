const darkMode = document.querySelector(".dark_mode_btn");
const body = document.querySelector("body");
const card = document.querySelectorAll(".card");
const jumbotron = document.querySelector(".jumbotron");
const list_card = document.querySelector(".reviews");
const service = document.querySelector("#service-partners");
const fonts = document.querySelectorAll(".font-cond");
const information = document.querySelector(".information_section");
const shopInfo = document.querySelector(".shop-info");
const item_collection = document.querySelectorAll(".toys-collection-item");
const bodyDark = document.querySelector(".body_dark");
darkMode.addEventListener("click", () => {
  card.forEach((e) => {
    e.classList.toggle("card_border");
    e.classList.toggle("allDark");
  });
  jumbotron.classList.toggle("allDark");
  information.classList.toggle("allDark");
  fonts.forEach((e) => e.classList.toggle("reviews_list"));
  service.classList.toggle("allDark");
  bodyDark.classList.toggle("allDark");
});
darkMode.addEventListener("click", () => {
  body.classList.toggle("allDark");
  shopInfo.classList.toggle("allDark");
  item_collection.forEach((e) => e.classList.toggle("card_Color"));
});

function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerText = "Geo Not Supported";
  }
}
function showPosition(data) {
  // console.log(data);
  let latitude = data.coords.latitude;
  let longitude = data.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  //api calling
  // https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}

  fetch(url, { method: "GET" })
    //return promise
    .then((res) => res.json())
    // resolve promise
    .then((data) => {
      let icon = data.list[0].weather[0].icon;
      // console.log(cityName);
      let temp = data.list[0].temp.day;
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      x.src = imgURL;
      y.innerHTML = `${temp}° C`;
    });

  // x.innerText = `Latitude is ${latitude} and Longitude is ${longitude}`;
}

window.addEventListener("load", geolocation);

// // const closeCoupon = function () {
// //   document.querySelector(".coupon").style.visibility = "hidden";
// // };

// // overlay.addEventListener("click", closeModal);
