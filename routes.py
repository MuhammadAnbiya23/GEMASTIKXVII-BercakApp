from flask import request, session, flash, redirect, url_for, render_template
from app import app,db, bcrypt
from models_flask import DataUser
from utils_flask import is_valid_email, is_valid_password

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
    
@app.route('/toggle-color-mode')
def toggle_color_mode():
    mode = request.args.get('mode')
    if mode == 'on':
        session['color_mode'] = 'on'
        return redirect(url_for('indexv2'))
    else:
        session['color_mode'] = 'off'
        return redirect(url_for('index'))

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/speechRecognition', methods=['GET'])
def speechRecognition():
    return render_template('speechRecognition.html')

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


@app.route('/deafEduv2')
def deafEduv2():
    return render_template('deafEduv2.html')

@app.route('/quizv2')
def quizv2():
    return render_template('quizv2.html')

@app.route('/signRv2')
def signRv2():
    return render_template('signRv2.html')

@app.route('/speechRv2', methods=['GET'])
def speechRv2():
    return render_template('speechRv2.html')

@app.route('/resourcev2')
def resourcev2():
    return render_template('resourcev2.html')

@app.route('/aboutv2')
def aboutv2():
    return render_template('aboutv2.html')

@app.route('/sosmedv2')
def sosmedv2():
    return render_template('sosmedv2.html')

@app.route('/faqv2')
def faqv2():
    return render_template('faqv2.html')


@app.route("/login/register", methods=['GET', 'POST'])
def login_register():
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

            existing_user = DataUser.get_user_by_email(email)
            if existing_user:
                errors['email_register_error'] = 'Email sudah terdaftar.'
                return render_template('registLogin.html', errors=errors)

            DataUser.create_user(name, email, password)
            flash('Registrasi berhasil. Silakan login.', 'success')
            return redirect(url_for('login'))

    return render_template('registLogin.html')
        
@app.route("/login", methods=['POST', 'GET'])
def login():        
    if 'email-login' in request.form:
        email = request.form.get('email-login')
        password = request.form.get('password-login')
        user = DataUser.get_user_by_email(email)

        if user and DataUser.check_password(user['password'], password):
            session['logged_in'] = True
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session.permanent = True
            return redirect(url_for('dashboard'))
        else:
            errors = {'login_error': 'Email atau password salah.'}
            return render_template('loginRegist.html', errors=errors)

    return render_template('loginRegist.html')

@app.route("/logout", methods=['GET'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    session.pop('user_name', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('dashboard'))


