from flask import Flask
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

from routes import *

if __name__== "__main__":
   app.run(debug=True)
