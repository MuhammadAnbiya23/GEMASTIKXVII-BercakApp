from flask import Flask, session, flash, redirect, url_for, render_template
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
from flask_restful import Api
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import os


app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
db = MySQL(app)

# Konfigurasi database
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_gemastik'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Konfigurasi aplikasi
app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
app.config['ENV'] = 'development'
app.config['DEBUG'] = True
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])

db.init_app(app)

# Memuat rute
from routes import *

if __name__ == "__main__":
    app.run(debug=True)
