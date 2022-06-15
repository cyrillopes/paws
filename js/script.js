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
darkMode.addEventListener("click", () => {
  shopInfo.classList.add("allDark");
  item_collection.forEach((e) => e.classList.add("card_Color"));
  body.classList.add("allDark");
  card.forEach((e) => {
    e.classList.add("card_border");
    e.classList.add("allDark");
  });
  jumbotron.classList.add("allDark");
  information.classList.add("allDark");
  fonts.forEach((e) => e.classList.add("reviews_list"));
  service.classList.add("allDark");
});
