from flask import request, session, flash, redirect, url_for, render_template
from app import app, db, bcrypt
from models import DataUser
from utils import is_valid_email, is_valid_password


@app.route("/dashboard/")
def dashboard():
    # if 'logged_in' in session:
    #     user_id = session.get('user_id')
    #     user = DataUser.query.get(user_id)
    #     if user:
            return render_template("index.html")#, name=user.name)
    #     else:
    #         flash('User not found.', 'danger')
    #         return redirect(url_for('masuk'))
    # else:
    #     flash('You are not logged in.', 'danger')
    #     return redirect(url_for('masuk'))


@app.route('/toggle-color-mode', methods=['GET', 'POST'])
def toggle_color_mode():
    if session.get('color_mode') == 'off':
        session['color_mode'] = 'on'
        return redirect('indexv2')  
    else:
        session['color_mode'] = 'on'
        return redirect(url_for('dashboard'))

@app.route('/indexv2')
def indexv2():
    return render_template('indexv2.html')

@app.route('/deafEducation')
def deafEducation():
    return render_template('deafEducation.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/signRecognition')
def signRecognition():
    return render_template('signRecognition.html')

@app.route('/speechRecognition')
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

@app.route('/masuk')
def masuk():
    return render_template('masuk.html')


@app.route("/masuk/", methods=['GET', 'POST'])
def registrasi():
    if request.method == 'POST':
        name = request.form['name-registrasi']
        email = request.form['email-registrasi']
        password = request.form['password-registrasi']
        confirm_password = request.form['confirm-password-registrasi']  
        
        if not name or not email or not password or not confirm_password: 
            flash('Semua kolom harus diisi.', 'danger')
            return redirect(url_for('masuk'))

        if not is_valid_email(email):
            flash('Email tidak valid.', 'danger')
            return redirect(url_for('masuk'))

        if not is_valid_password(password):
            flash('Password harus memiliki minimal 8 karakter.', 'danger')
            return redirect(url_for('masuk'))
        
        if password != confirm_password:  
            flash('Konfirmasi password tidak sesuai.', 'danger')
            return redirect(url_for('masuk'))

        existing_user = DataUser.query.filter_by(email=email).first()
        if existing_user:
            flash('Email sudah terdaftar.', 'danger')
            return redirect(url_for('masuk'))

        new_registration = DataUser(name=name, email=email, password=password)
        new_registration.save()
        
        return render_template("masuk.html")

        
def login():
    if request.method == 'POST':
        email = request.form['email-login']
        password = request.form['password-login']

        user = DataUser.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            session['logged_in'] = True
            session['user_id'] = user.id
            session.permanent = True
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password.', 'danger')
            return redirect(url_for('login'))
    
    return render_template("masuk.html")


@app.route("/logout/", methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))