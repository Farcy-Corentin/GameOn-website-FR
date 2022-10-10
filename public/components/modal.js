function editNav() {
  const closeModal = document.getElementById("myTopnav");
  if (closeModal.className === "topnav") {
    return closeModal.className += " responsive";
  } 
  
  return closeModal.className = "topnav";
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  return modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  return modalbg.style.display = "none";
}