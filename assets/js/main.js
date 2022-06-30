"use strict";
// navigation
jQuery(".stellarnav").stellarNav({
  breakpoint: 960,
  position: "right",
});
// Travixum slider
var swiper = new Swiper(".travi-slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
