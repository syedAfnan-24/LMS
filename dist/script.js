"use strict";
//mobile toggle ui
const mobileMenuButton = document.getElementById("mobile-menu");
const menu = document.querySelector(".menu");
mobileMenuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});
