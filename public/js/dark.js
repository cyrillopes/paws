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
  fonts.forEach((e) => e.classList.toggle("reviews_list"));
  console.log(":Hekekdkekekekek");
  body.classList.toggle("allDark");
  shopInfo.classList.toggle("allDark");
  item_collection.forEach((e) => e.classList.toggle("card_Color"));
});
darkMode.addEventListener("click", () => {
  jumbotron.classList.toggle("allDark");
  information.classList.toggle("allDark");
  list_card.classList.toggle("allDark");
  service.classList.toggle("allDark");
  bodyDark.classList.toggle("allDark");
  card.forEach((e) => {
    e.classList.toggle("card_border");
    e.classList.toggle("allDark");
  });
});
