from flask import Flask, session, flash, redirect, url_for, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

import os

app = Flask(__name__)
db = SQLAlchemy()
api = Api(app)
bcrypt = Bcrypt(app)


filename = os.path.dirname(os.path.abspath(__file__))
database = "sqlite:///" + os.path.join(filename, "db.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

db.init_app(app)

with app.app_context():
    db.create_all()

from routes import *

if __name__ == "__main__":
    app.run(debug=True)
    
# code debungging on = flask --app app.py --debug run