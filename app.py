from flask import Flask, session,  redirect, url_for, render_template
# , request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'supersecretkey' 

# Set environment and debug mode
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

# @app.route('/')
# def home():
#     if 'username' in session:
#         return render_template('index.html')
#     return redirect(url_for('login'))

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         # Verifikasi login di sini (gunakan database, hashing password, dll.)
#         if username == 'admin' and password == 'password':  # Ganti dengan verifikasi yang aman
#             session['username'] = username
#             return redirect(url_for('home'))
#         else:
#             return 'Login Failed'
#     return render_template('login.html')

# @app.route('/logout')
# def logout():
#     session.pop('username', None)
#     return redirect(url_for('login'))

@app.route('/toggle-color-mode', methods=['GET', 'POST'])
def toggle_color_mode():
    if session.get('color_mode') == 'off':
        session['color_mode'] = 'on'
        return redirect('indexv2')  # Redirect to the off mode page
    else:
        session['color_mode'] = 'on'
        return redirect(url_for('home'))

# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/indexv2')
def indexv2():
    return render_template('indexv2.html')

@app.route('/deaf')
def deaf():
    return render_template('deaf.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/sign')
def sign():
    return render_template('sign.html')

@app.route('/voice')
def voice():
    return render_template('voice.html')

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

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run()
    
# code debungging on = flask --app app.py --debug run