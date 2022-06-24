const modal = document.querySelector(".modalCoupon");
const overlay = document.querySelector(".overlay");
const btnModalClose = document.querySelector(".close-modal2");
const navbar = document.querySelector(".navbar");
const modelCoupon = setTimeout(function () {
  modal.classList.remove("hidden2");
  overlay.classList.remove("hidden2");
  navbar.classList.add("hidden2");
}, 1000);
const closeModal = function () {
  modal.classList.add("hidden2");
  overlay.classList.add("hidden2");
  navbar.classList.remove("hidden2");
};

btnModalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

modelCoupon();
