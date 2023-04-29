/**
 * This script give functionality to the hamburger button when the
 * browser is smaller than 800px wide.
 */
let clicked = false;
const button = document.getElementById("menuButton");
const closeButton = document.getElementById("closeMenuButton");
const navMenu = document.getElementById("mobileNav");
const openIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeMenuIcon");

closeIcon.style.visibility = "hidden";
closeIcon.style.display = "none";

button.addEventListener("click", () => {
  clicked = !clicked;
  if (clicked) {
    navMenu.style.height = "300px";
    navMenu.style.visibility = "visible";
    navMenu.style.display = "block";
    navMenu.style.width = "100%";
    closeIcon.style.visibility = "visible";
    closeIcon.style.display = "block";
    openIcon.style.visibility = "hidden";
    openIcon.style.display = "none";
  } else {
    navMenu.style.height = "0";
    navMenu.style.visibility = "hidden";
    navMenu.style.display = "none";
    navMenu.style.width = "0";
    closeIcon.style.visibility = "hidden";
    closeIcon.style.display = "none";
    openIcon.style.visibility = "visible";
    openIcon.style.display = "block";
  }
});
