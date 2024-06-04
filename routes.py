from flask import request, session, flash, redirect, url_for, render_template
from app import app, db, bcrypt, s
from models import DataUser
from utils import is_valid_email, is_valid_password
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import SignatureExpired, BadTimeSignature, BadSignature


@app.route("/dashboard/")
def dashboard():
    if 'logged_in' in session:
        user_id = session.get('user_id')
        user = DataUser.get_user_by_email(user_id)
        if user:
            return render_template("index.html", name=user['name'])
        else:
            flash('User not found.', 'danger')
            return redirect(url_for('index'))
    else:
        flash('You are not logged in.', 'danger')
        return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/deafEducation')
def deafEducation():
    return render_template('deafEducation.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/signRecognition')
def signRecognition():
    return render_template('signRecognition.html')

@app.route('/speechRecognition', methods=['GET'])
def speechRecognition():
    return render_template('speechRecognition.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/resource')
def resource():
    return render_template('resource.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/sosmed')
def sosmed():
    return render_template('sosmed.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        if 'name-registrasi' in request.form:
            name = request.form.get('name-registrasi')
            email = request.form.get('email-registrasi')
            password = request.form.get('password-registrasi')
            confirm_password = request.form.get('confirm-password-registrasi')

            errors = {}
            if not name or not email or not password or not confirm_password:
                if not name:
                    errors['name_error'] = 'Nama harus diisi.'
                if not email:
                    errors['email_register_error'] = 'Email harus diisi.'
                if not password:
                    errors['password_register_error'] = 'Password harus diisi.'
                if not confirm_password:
                    errors['confirm_password_error'] = 'Konfirmasi password harus diisi.'
                return render_template('registLogin.html', errors=errors)

            if not is_valid_email(email):
                errors['email_register_error'] = 'Email tidak valid.'
                return render_template('registLogin.html', errors=errors)

            if not is_valid_password(password):
                errors['password_register_error'] = 'Password harus memiliki minimal 8 karakter.'
                return render_template('registLogin.html', errors=errors)

            if password != confirm_password:
                errors['confirm_password_error'] = 'Konfirmasi password tidak sesuai.'
                return render_template('registLogin.html', errors=errors)

            user = DataUser.get_user_by_email(email)
            if user:
                errors['email_register_error'] = 'Email sudah terdaftar.'
                return render_template('registLogin.html', errors=errors)

            DataUser.create_user(name, email, password)
            flash('Registrasi berhasil. Silakan login.', 'success')
            return redirect(url_for('login'))

    return render_template('registLogin.html')
        
@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        errors = {}

        email = request.form.get('email-login')
        password = request.form.get('password-login')
        user = DataUser.get_user_by_email(email)

        if user and bcrypt.check_password_hash(user['password'], password):
            session['logged_in'] = True
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session.permanent = True
            return redirect(url_for('dashboard'))
        else:
            errors['login_error'] = 'Email atau password salah.'
            return render_template('loginRegist.html', errors=errors)

    return render_template('loginRegist.html')


@app.route("/logout", methods=['GET'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

@app.route('/forgot-password', methods=['GET', 'POST'])
def request_reset_password():
    if request.method == 'POST':
        email = request.form['email-reset']
        user = DataUser.get_user_by_email(email)
        if user:
            token = s.dumps(email, salt='email-confirm')
            link = url_for('reset_password', token=token, _external=True)
            # Kirim email dengan link reset password ke user (disarankan menggunakan library pengiriman email)
            print(f"Reset password link: {link}")  # Untuk debugging
            flash('Link reset password telah dikirim ke email Anda.', 'info')
        else:
            flash('Email tidak ditemukan.', 'danger')
        return redirect(url_for('login'))
    return render_template('lupaPassword.html')


@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)  # 1 hour expiration
    except (SignatureExpired, BadTimeSignature, BadSignature) as e:
        flash('Link reset password tidak valid atau sudah kadaluarsa.', 'danger')
        return redirect(url_for('request_reset_password'))

    if request.method == 'POST':
        new_password = request.form['new_password']
        confirm_password = request.form['confirm_password']
        if new_password == confirm_password:
            hashed_password = generate_password_hash(new_password)
            user = DataUser.get_user_by_email(email)
            if user:
                DataUser.update_password(email, hashed_password)
                flash('Password Anda telah diubah.', 'success')
                return redirect(url_for('login'))
            else:
                flash('User tidak ditemukan.', 'danger')
        else:
            flash('Password dan konfirmasi password tidak cocok.', 'danger')

    return render_template('resetPassword.html', token=token)



# @app.route('/toggle-color-mode')
# def toggle_color_mode():
#     session['color_mode'] = 'off' if session.get('color_mode') == 'on' else 'on'
#     return redirect(url_for('index'))

