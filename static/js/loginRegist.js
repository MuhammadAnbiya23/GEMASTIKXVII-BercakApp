// const container = document.getElementById('container');
// const registerBtn = document.getElementById('register');
// const loginBtn = document.getElementById('login');

// registerBtn.addEventListener('click', () => {
//     container.classList.add("active");
// });

// loginBtn.addEventListener('click', () => {
//     container.classList.remove("active");
// });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('input[name="name-registrasi"]').value;
        const email = document.querySelector('input[name="email-registrasi"]').value;
        const password = document.querySelector('input[name="password-registrasi"]').value;
        const confirmPassword = document.querySelector('input[name="confirm-password-registrasi"]').value;

        // Clear previous error messages
        document.getElementById('name-error').textContent = '';
        document.getElementById('email-register-error').textContent = '';
        document.getElementById('password-register-error').textContent = '';
        document.getElementById('confirm-password-error').textContent = '';

        if (password !== confirmPassword) {
            document.getElementById('confirm-password-error').textContent = 'Konfirmasi password tidak sesuai.';
            return;
        }

        fetch('/loginRegist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name-registrasi': name,
                'email-registrasi': email,
                'password-registrasi': password,
                'confirm-password-registrasi': confirmPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Registrasi berhasil! Silakan login.');
                    window.location.href = '/login';
                } else {
                    if (data.message.includes('Email')) {
                        document.getElementById('email-register-error').textContent = data.message;
                    } else if (data.message.includes('password')) {
                        document.getElementById('password-register-error').textContent = data.message;
                    } else {
                        document.getElementById('name-error').textContent = data.message;
                    }
                }
            })
            .catch(error => {
                document.getElementById('confirm-password-error').textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('input[name="email-login"]').value;
        const password = document.querySelector('input[name="password-login"]').value;

        // Clear previous error messages
        document.getElementById('email-login-error').textContent = '';
        document.getElementById('password-login-error').textContent = '';

        fetch('/loginRegist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email-login': email,
                'password-login': password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/dashboard';
                } else {
                    if (data.message.includes('Email atau password salah')) {
                        document.getElementById('password-login-error').textContent = data.message;
                    } else {
                        document.getElementById('email-login-error').textContent = data.message;
                    }
                }
            })
            .catch(error => {
                document.getElementById('password-login-error').textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            });
    });