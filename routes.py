from flask import request, session, flash, redirect, url_for, render_template
from app import app, bcrypt
from models import DataUser
from utils import is_valid_email, is_valid_password

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

@app.route("/loginRegist", methods=['GET', 'POST'])
def login_register():
    if request.method == 'POST':
        if 'name-registrasi' in request.form:
            # Ini adalah logika untuk registrasi
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
                return render_template('loginRegist.html', errors=errors)

            if not is_valid_email(email):
                errors['email_register_error'] = 'Email tidak valid.'
                return render_template('loginRegist.html', errors=errors)

            if not is_valid_password(password):
                errors['password_register_error'] = 'Password harus memiliki minimal 8 karakter.'
                return render_template('loginRegist.html', errors=errors)

            if password != confirm_password:
                errors['confirm_password_error'] = 'Konfirmasi password tidak sesuai.'
                return render_template('loginRegist.html', errors=errors)

            existing_user = DataUser.get_user_by_email(email)
            if existing_user:
                errors['email_register_error'] = 'Email sudah terdaftar.'
                return render_template('loginRegist.html', errors=errors)

            DataUser.create_user(name, email, password)
            flash('Registrasi berhasil. Silakan login.', 'success')
            return redirect(url_for('login_register'))

        elif 'email-login' in request.form:
            # Ini adalah logika untuk login
            email = request.form.get('email-login')
            password = request.form.get('password-login')
            user = DataUser.get_user_by_email(email)

            if user:
                # if DataUser.check_password(password):
                    session['logged_in'] = True
                    session['user_id'] = user['id']
                    session['user_name'] = user['name']
                    session.permanent = True
                    return redirect(url_for('dashboard'))
                # else:
                #     errors = {'login_error': 'Invalid email or password.'}
                #     return render_template('loginRegist.html', errors=errors)
            else:
                errors = {'login_error': 'Invalid email or password.'}
                return render_template('loginRegist.html', errors=errors)

    return render_template('loginRegist.html')
@app.route("/logout", methods=['GET'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('dashboard'))


# @app.route('/toggle-color-mode')
# def toggle_color_mode():
#     session['color_mode'] = 'off' if session.get('color_mode') == 'on' else 'on'
#     return redirect(url_for('index'))

