from flask import Flask, session, flash, redirect, url_for, render_template
from flask_restful import Api
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
db = MySQL(app)

db.init_app(app)    

from . import routes