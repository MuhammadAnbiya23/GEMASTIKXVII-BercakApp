from flask import request, session, flash, redirect, url_for, render_template
from app import app, db, bcrypt
from models import DataUser
from utils import is_valid_email, is_valid_password   

@app.route("/dashboard/")
def dashboard():
    if 'logged_in' in session:
        user_id = session.get('user_id')
        user = DataUser.query.get(user_id)
        if user:
            return render_template("index.html", name=user.name)
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
def loginRegist():
    if request.method == 'POST':
        if 'name-registrasi' in request.form:
            name = request.form.get('name-registrasi')
            email = request.form.get('email-registrasi')
            password = request.form.get('password-registrasi')
            confirm_password = request.form.get('confirm-password-registrasi')

            if not name or not email or not password or not confirm_password:
                flash('Semua kolom harus diisi.', 'danger')
                return redirect(url_for('loginRegist'))

            if not is_valid_email(email):
                flash('Email tidak valid.', 'danger')
                return redirect(url_for('loginRegist'))

            if not is_valid_password(password):
                flash('Password harus memiliki minimal 8 karakter.', 'danger')
                return redirect(url_for('loginRegist'))

            if password != confirm_password:
                flash('Konfirmasi password tidak sesuai.', 'danger')
                return redirect(url_for('loginRegist'))

            existing_user = DataUser.query.filter_by(email=email).first()
            if existing_user:
                flash('Email sudah terdaftar.', 'danger')
                return redirect(url_for('loginRegist'))

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_registration = DataUser(name=name, email=email, password=hashed_password)
            db.session.add(new_registration)
            db.session.commit()

            flash('Registrasi berhasil. Silakan login.', 'success')
            return redirect(url_for('loginRegist'))

        if 'email-login' in request.form:
            email = request.form.get('email-login')
            password = request.form.get('password-login')

            user = DataUser.query.filter_by(email=email).first()

            if user : #and bcrypt.check_password_hash(user.password, password):
                session['logged_in'] = True
                session['user_id'] = user.id
                session.permanent = True
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid email or password.', 'danger')
                return redirect(url_for('loginRegist'))
    
    return render_template('loginRegist.html')

@app.route("/logout", methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('loginRegist'))


# Uncomment and fix if needed:
# @app.route('/toggle-color-mode')
# def toggle_color_mode():
#     session['color_mode'] = 'off' if session.get('color_mode') == 'on' else 'on'
#     return redirect(url_for('index'))

