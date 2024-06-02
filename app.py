from flask import Flask, session, flash, redirect, url_for, render_template
from flask_restful import Api
from flask_mysqldb import MySQL
# from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

import os

# db = SQLAlchemy()
app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
db = MySQL(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'db_gemastik'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# filename = os.path.dirname(os.path.abspath(__file__))
# database = "sqlite:///" + os.path.join(filename, "db.sqlite")
# app.config["SQLALCHEMY_DATABASE_URI"] = database
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

db.init_app(app)

# with app.app_context():
#     db.create_all()

from routes import *

if __name__ == "__main__":
    app.run(debug=True)
    
