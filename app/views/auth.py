from flask import Blueprint, request, session, flash, redirect, url_for, render_template
from ..models.user import DataUser
from ..utils import is_valid_email, is_valid_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/loginRegist')
def loginRegist():
    return render_template('loginRegist.html')

@auth_bp.route("/loginRegist/", methods=['GET', 'POST'])
def registrasi():
    if request.method == 'POST':
        name = request.form['name-registrasi']
        email = request.form['email-registrasi']
        password = request.form['password-registrasi']
        confirm_password = request.form['confirm-password-registrasi']  
        
        if not name or not email or not password or not confirm_password: 
            flash('Semua kolom harus diisi.', 'danger')
            return redirect(url_for('auth.loginRegist'))

        if not is_valid_email(email):
            flash('Email tidak valid.', 'danger')
            return redirect(url_for('auth.loginRegist'))

        if not is_valid_password(password):
            flash('Password harus memiliki minimal 8 karakter.', 'danger')
            return redirect(url_for('auth.loginRegist'))
        
        if password != confirm_password:  
            flash('Konfirmasi password tidak sesuai.', 'danger')
            return redirect(url_for('auth.loginRegist'))

        existing_user = DataUser.query.filter_by(email=email).first()
        if existing_user:
            flash('Email sudah terdaftar.', 'danger')
            return redirect(url_for('auth.loginRegist'))

        new_registration = DataUser(name=name, email=email, password=password)
        new_registration.save()
        
        flash('Registrasi berhasil. Silakan login.', 'success')
        return redirect(url_for('auth.loginRegist'))  # Redirect to the login page after successful registration

    # Jika method adalah GET, tampilkan halaman registrasi
    return render_template("loginRegist.html")

@auth_bp.route("/login/", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email-login']
        password = request.form['password-login']

        user = DataUser.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            session['logged_in'] = True
            session['user_id'] = user.id
            session.permanent = True
            return redirect(url_for('main.index'))
        else:
            flash('Invalid email or password.', 'danger')
            return redirect(url_for('auth.login'))
    
    return render_template("loginRegist.html")

@auth_bp.route("/logout/", methods=['POST'])
def logout():
    session.pop('logged_in', None)
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login'))
