let z = document.querySelector(".icon");
let y = document.querySelector(".temp");
function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    z.innerText = "Geo Not Supported";
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
      console.log(icon, temp);
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      z.src = imgURL;
      y.innerHTML = `${temp}° C`;
    });

  // x.innerText = `Latitude is ${latitude} and Longitude is ${longitude}`;
}
geolocation();
// window.addEventListener("load", geolocation);
