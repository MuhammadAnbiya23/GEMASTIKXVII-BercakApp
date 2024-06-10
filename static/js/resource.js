document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const sections = document.querySelectorAll('.toggle-section');
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            section.classList.toggle('d-none');
        });
    });
});

function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }