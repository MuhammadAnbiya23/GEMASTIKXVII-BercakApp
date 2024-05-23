const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.querySelector('input[name="password-registrasi"]').value;
    const confirmPassword = document.querySelector('input[name="confirm-password-registrasi"]').value;
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Konfirmasi password tidak sesuai.';
    } else {
        errorMessage.textContent = '';
        // menambahkan kode untuk pendaftaran
        alert('Registration successful!');
    }
});