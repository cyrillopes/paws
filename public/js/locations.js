const locationUrl = "https://paws-for-adoption.herokuapp.com/location";
const locationEl = document.querySelector(".search_location");
const districts = document.querySelector(".search_district");

const callLocation = async function (url) {
  const location = await fetch(url);
  const data = await location.json();

  data.map((location) => {
    let markup = document.createElement("option");
    let stateName = document.createTextNode(location.state);
    markup.appendChild(stateName);
    markup.value = location.state_id;
    locationEl.appendChild(markup);
  });
};

console.log(locationEl.value);
const callRest = async function () {
  let locationValue = Number(locationEl.value) - 1;
  if (districts.length > 0) districts.innerHTML = "";

  const restaurant = await fetch(
    `https://api.npoint.io/a66723bb366d82c47202/${locationValue}/districts`
  );
  const data = await restaurant.json();
  data.map((rest) => {
    console.log(rest);
    let markup = document.createElement("option");
    let restName = document.createTextNode(rest);
    console.log(restName);

    markup.appendChild(restName);
    districts.appendChild(markup);
  });
};
callLocation(locationUrl);
locationEl.onchange = callRest;

// const searchLocations = document.querySelector(".search_location");
// const locations = document.querySelector(".location");
// const results = document.querySelector(".results");
// let searchable = ["hello", "bye"];
// searchLocations.addEventListener("keyup", (e) => {
//   // console.log(e.target.value);
//   let results = [];
//   let input = searchLocations.value;
//   if (input.length) {
//     results = searchable.filter((item) => {
//       return item.toLowerCase().includes(input.toLowerCase());
//     });
//   }
//   renderResults(results);
// });

// const renderResults = function (results) {
//   if (!results.length) return searchLocations.classList.remove("show");

//   let content = results
//     .map((item) => {
//       return `<li>${item}</li>`;
//     })
//     .join("");
//   locations.classList.add("show");
//   results.innerHTML = `<ul>${content}</ul>`;
// };
