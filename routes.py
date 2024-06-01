from flask import request, session, flash, redirect, url_for, render_template, jsonify
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
        if request.is_json:
            data = request.get_json()
        else:
            return jsonify({'success': False, 'message': 'Unsupported Media Type. Content-Type harus application/json.'}), 415

        if 'name-registrasi' in data:
            name = data['name-registrasi']
            email = data['email-registrasi']
            password = data['password-registrasi']
            confirm_password = data['confirm-password-registrasi']

            if not name or not email or not password or not confirm_password:
                return jsonify({'success': False, 'message': 'Semua kolom harus diisi.'}), 400

            if not is_valid_email(email):
                return jsonify({'success': False, 'message': 'Email tidak valid.'}), 400

            if not is_valid_password(password):
                return jsonify({'success': False, 'message': 'Password harus memiliki minimal 8 karakter.'}), 400

            if password != confirm_password:
                return jsonify({'success': False, 'message': 'Konfirmasi password tidak sesuai.'}), 400

            existing_user = DataUser.query.filter_by(email=email).first()
            if existing_user:
                return jsonify({'success': False, 'message': 'Email sudah terdaftar.'}), 400

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_registration = DataUser(name=name, email=email, password=hashed_password)
            db.session.add(new_registration)
            db.session.commit()

            return jsonify({'success': True, 'message': 'Registrasi berhasil. Silakan login.'}), 200

        if 'email-login' in data:
            email = data['email-login']
            password = data['password-login']

            user = DataUser.query.filter_by(email=email).first()

            if user and bcrypt.check_password_hash(user.password, password):
                session['logged_in'] = True
                session['user_id'] = user.id
                session['user_name'] = user.name
                session.permanent = True
                return jsonify({'success': True}), 200
            else:
                return jsonify({'success': False, 'message': 'Email atau password salah.'}), 400

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

