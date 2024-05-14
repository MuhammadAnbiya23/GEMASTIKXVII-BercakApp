// POP UP LOGIN-DAFTAR
// Get the modal
const loginModal = document.getElementById("loginModal");
const signUpModal = document.getElementById("signUpModal");

// Get the button that opens the modal
const loginBtn = document.getElementById("loginBtn");
const signUpBtn = document.getElementById("signUpBtn");

// Get the <span> element that closes the modal
const closeLoginSpan = document.getElementsByClassName("close")[0];
const closeSignUpSpan = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal
function openLoginModal() {
  loginModal.style.display = "block";
}

function openSignUpModal() {
  signUpModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeLoginModal() {
  loginModal.style.display = "none";
}

function closeSignUpModal() {
  signUpModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  } else if (event.target === signUpModal) {
    signUpModal.style.display = "none";
  }
}

