document.addEventListener('DOMContentLoaded', function() {
  console.log('JavaScript is working!');
});

let description = document.querySelectorAll(content-description);

window.onscroll = () => {
  description.forEach(sec => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 150;
      let height = sec.offsetHeight;

      if (top >= offset && top < offset +
           height){
              sec.classList.add('show-animate');
           }
      
      else {
          sec.classList.remove('show-animate');
      }
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  const switchElement = document.getElementById('colorModeSwitch');

  // Load the dark mode setting from local storage if it exists
  if (localStorage.getItem('color-mode') === 'dark') {
      document.body.classList.add('dark-mode');
      switchElement.checked = true;
      toggleColorMode(true);
  }

  switchElement.addEventListener('change', function() {
      if (this.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('color-mode', 'dark');
          toggleColorMode(true);
      } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('color-mode', 'light');
          toggleColorMode(false);
      }
  });

  function toggleColorMode(enable) {
      const navbar = document.querySelector('.navbar');
      const links = document.querySelectorAll('.nav-link');
      const brand = document.querySelector('.navbar-brand');
      const label = document.querySelector('.form-check-label');

      if (enable) {
          navbar.classList.add('dark-mode');
          brand.classList.add('dark-mode');
          label.classList.add('dark-mode');
          links.forEach(link => link.classList.add('dark-mode'));
      } else {
          navbar.classList.remove('dark-mode');
          brand.classList.remove('dark-mode');
          label.classList.remove('dark-mode');
          links.forEach(link => link.classList.remove('dark-mode'));
      }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const slideOption = document.getElementById('slideOption');
  const popupOption = document.getElementById('popupOption');
  const slideInElement = document.getElementById('slideInElement');
  const popupModal = new bootstrap.Modal(document.getElementById('popupModal'));

  slideOption.addEventListener('click', (e) => {
      e.preventDefault();
      slideInElement.classList.toggle('show');
      setTimeout(() => {
          slideInElement.classList.remove('show');
      }, 3000); // Hide after 3 seconds
  });

  popupOption.addEventListener('click', (e) => {
      e.preventDefault();
      popupModal.show();
  });
});
document.addEventListener('DOMContentLoaded', () => {
const profileStatsOption = document.getElementById('profileStatsOption');
const profileStatsModal = new bootstrap.Modal(document.getElementById('profileStatsModal'));

profileStatsOption.addEventListener('click', (e) => {
  e.preventDefault();
  fetchProfileStats(); // Fetch and display the profile statistics when the option is clicked
});
});

$(document).ready(function() {
// Function to fetch profile statistics data from the server
function fetchProfileStats() {
  // This would typically involve an AJAX request to the server to get the data
  // For demonstration purposes, we use static data here
  const data = {
    bestScore: 1500,
    winStreak: 10,
    quizCount: 25,
    achievements: "Top Scorer, Quick Learner",
    totalDays: 100, // Assuming user joined 100 days ago
    screenTime: "120 hours" // Total screen time
  };

  // Fill in the data
  $('#bestScore').text(data.bestScore);
  $('#winStreak').text(data.winStreak);
  $('#quizCount').text(data.quizCount);
  $('#achievements').text(data.achievements);
  $('#totalDays').text(data.totalDays);
  $('#screenTime').text(data.screenTime);

  // Show the modal
  $('#profileStatsModal').modal('show');
}

// Event handler for profile statistics dropdown option
$('#profileStatsOption').click(function() {
  fetchProfileStats();
});
});

$(document).ready(function () {
  $('#slideOption').click(function () {
      $('#slideInElement').toggle();
  });

  $('#infoLink').click(function () {
      $('#popupModal').modal('show');
  });

  // Simulate login status
  const isLoggedIn = false; // Change to true if the user is logged in

  if (!isLoggedIn) {
      $('#profileDropdown').hide();
      $('#loginButton').show();
  } else {
      $('#profileDropdown').show();
      $('#loginButton').hide();
  }

  $('#loginButton').click(function () {
      // Handle login logic
      alert('Login button clicked!');
      // After login, hide login button and show profile
      $('#loginButton').hide();
      $('#profileDropdown').show();
  });

  // Dark mode switch
  $('#colorModeSwitch').change(function () {
      if ($(this).is(':checked')) {
          $('body').addClass('dark-mode');
      } else {
          $('body').removeClass('dark-mode');
      }
  });
});

$(document).ready(function () {
  $('#slideOption').click(function () {
      $('#slideInElement').toggle();
  });

  $('#infoLink').click(function () {
      $('#popupModal').modal('show');
  });

  // Simulate login status
  const isLoggedIn = false; // Change to true if the user is logged in

  if (!isLoggedIn) {
      $('#profileDropdown').hide();
      $('#loginButton').show();
  } else {
      $('#profileDropdown').show();
      $('#loginButton').hide();
  }

  $('#loginButton').click(function () {
      // Handle login logic
      alert('Login button clicked!');
      // After login, hide login button and show profile
      $('#loginButton').hide();
      $('#profileDropdown').show();
  });
});


document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function () {
  const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
  
  window.showPopup = function (feature) {
    document.getElementById('featureModalLabel').textContent = feature;
    document.getElementById('featureModalContent').textContent = 'Details about ' + feature;
    featureModal.show();
  };

  window.goToPage = function (page) {
    window.location.href = page;
  };
});

document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const authButtons = document.getElementById('authButtons');
  const profileDropdown = document.getElementById('profileDropdown');
  
  darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      darkModeToggle.textContent = 'Light Mode';
    } else {
      darkModeToggle.textContent = 'Dark Mode';
    }
  });

  // Dummy login state
  const loggedIn = false; // Change this to true to simulate login state

  if (loggedIn) {
    authButtons.classList.add('d-none');
    profileDropdown.classList.remove('d-none');
  }

  document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    authButtons.classList.add('d-none');
    profileDropdown.classList.remove('d-none');
    const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    loginModal.hide();
  });

  document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    authButtons.classList.add('d-none');
    profileDropdown.classList.remove('d-none');
    const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    registerModal.hide();
  });
});

function showPopup(feature) {
  const featureModalLabel = document.getElementById('featureModalLabel');
  const featureModalContent = document.getElementById('featureModalContent');

  featureModalLabel
  document.addEventListener('DOMContentLoaded', function () {
      const darkModeToggle = document.getElementById('darkModeToggle');
      const body = document.body;
      const authButtons = document.getElementById('authButtons');
      const profileDropdown = document.getElementById('profileDropdown');
      
      darkModeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
          darkModeToggle.textContent = 'Light Mode';
        } else {
          darkModeToggle.textContent = 'Dark Mode';
        }
      });
    
      // Dummy login state
      const loggedIn = false; // Change this to true to simulate login state
    
      if (loggedIn) {
        authButtons.classList.add('d-none');
        profileDropdown.classList.remove('d-none');
      }
    
      document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
        authButtons.classList.add('d-none');
        profileDropdown.classList.remove('d-none');
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
      });
    
      document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        authButtons.classList.add('d-none');
        profileDropdown.classList.remove('d-none');
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();
      });
    });
    
    function showPopup(feature) {
      const featureModalLabel = document.getElementById('featureModalLabel');
      const featureModalContent = document.getElementById('featureModalContent');
    
      featureModalLabel.textContent = `${feature} Feature`;
      featureModalContent.textContent = `Details about the ${feature} feature.`;
      
      const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
      featureModal.show();
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const slideOption = document.getElementById('historyOption');
  const slideInElement = document.getElementById('slideInElement');
  const closeSlide = document.getElementById('closeSlide');
  const loginButton = document.getElementById('loginButton');
  
  slideOption.addEventListener('click', function() {
       slideInElement.style.right = '0';
  });

  closeSlide.addEventListener('click', function() {
    slideInElement.style.right = '-300px';
  });

  loginButton.addEventListener('click', function() {
    window.location.href = "login.html"; // Adjust to your login page URL
  });

  document.getElementById('colorModeSwitch').addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
});

function showPopup(featureTitle) {
  const modalTitle = document.getElementById('featureModalLabel');
  const modalContent = document.getElementById('featureModalContent');
  
  modalTitle.innerText = featureTitle;
  modalContent.innerText = `More detailed description about ${featureTitle}.`;

  const featureModal = new bootstrap.Modal(document.getElementById('featureModal'));
  featureModal.show();
}

function goToPage(pageUrl) {
  window.location.href = pageUrl;
}


document.addEventListener('DOMContentLoaded', function() {
  const colorModeSwitch = document.getElementById('colorModeSwitch');

  // Load the saved mode from localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      colorModeSwitch.checked = true;
  }

  colorModeSwitch.addEventListener('change', function() {
      if (this.checked) {
          document.body.classList.add('dark-mode');
          localStorage.setItem('darkMode', 'enabled'); // Save the mode in localStorage
      } else {
          document.body.classList.remove('dark-mode');
          localStorage.setItem('darkMode', 'disabled'); // Save the mode in localStorage
      }
  });
});

document.addEventListener('DOMContentLoaded', function () {
const colorModeSwitch = document.getElementById('colorModeSwitch');
const body = document.body;

// Check for saved preference in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    colorModeSwitch.checked = true;
}

colorModeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled'); // Save preference to localStorage
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled'); // Save preference to localStorage
    }
});
});document.addEventListener('DOMContentLoaded', function () {
const colorModeSwitch = document.getElementById('colorModeSwitch');
const body = document.body;

// Check for saved preference in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    colorModeSwitch.checked = true;
}

colorModeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled'); // Save preference to localStorage
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled'); // Save preference to localStorage
    }
});
});

function handleSwitchChange() {
var switchElement = document.getElementById('colorModeSwitch');
if (!switchElement.checked) {
    window.location.href = '/toggle-color-mode';
} else {
    window.location.href = '/other-page';
}
}

// Get the modals
var logoutModal = document.getElementById("logoutModal");
var changePasswordModal = document.getElementById("changePasswordModal");

// Get the buttons that open the modals
var logoutBtn = document.getElementById("logoutBtn");
var changePasswordBtn = document.getElementById("changePasswordBtn");

// Get the <span> elements that close the modals
var spans = document.getElementsByClassName("close");

// Get the "Yes" and "No" buttons for logout modal
var yesBtn = document.getElementById("yesBtn");
var noBtn = document.getElementById("noBtn");

// When the user clicks the logout button, open the logout modal 
logoutBtn.onclick = function(event) {
  event.preventDefault();
  logoutModal.style.display = "block";
}

// When the user clicks the change password button, open the change password modal 
changePasswordBtn.onclick = function(event) {
  event.preventDefault();
  changePasswordModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for (var i = 0; i < spans.length; i++) {
  spans[i].onclick = function() {
      this.parentElement.parentElement.style.display = "none";
  }
}

// When the user clicks "No", close the logout modal
noBtn.onclick = function() {
  logoutModal.style.display = "none";
}

// When the user clicks "Yes", redirect to logout route
yesBtn.onclick = function() {
  window.location.href = "/logout";
}

// When the user clicks anywhere outside of the modals, close them
window.onclick = function(event) {
  if (event.target == logoutModal) {
      logoutModal.style.display = "none";
  }
  if (event.target == changePasswordModal) {
      changePasswordModal.style.display = "none";
  }
}

const containers = document.getElementById('containers');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
  containers.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  containers.classList.remove("active");
});

const openPopupBtn = document.getElementById('openPopup');
const closePopupBtn = document.getElementById('closePopup');
const popupOverlay = document.getElementById('popupOverlay');

openPopupBtn.addEventListener('click', () => {
  popupOverlay.style.display = 'flex';
});

closePopupBtn.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});

// Event listener existing untuk register dan login
registerBtn.addEventListener('click', () => {
  containers.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  containers.classList.remove("active");
});

function handleSwitchChange() {
var switchElement = document.getElementById('colorModeSwitch');
if (switchElement.checked) {
    window.location.href = '/toggle-color-mode?mode=on';
} else {
    window.location.href = '/toggle-color-mode?mode=off';
}
}