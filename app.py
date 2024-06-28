from flask import Flask
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
app.config['ENV'] = 'development'
app.config['DEBUG'] = True

from routes import *

if __name__ == "__main__":
   app.run(debug=True)