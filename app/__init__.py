from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
# from flask_login import LoginManager
# from dotenv import load_dotenv 
import os

db = SQLAlchemy()
bcrypt = Bcrypt()
# login_manager = LoginManager()

def create_app():
    app = Flask(__name__)

    # Load environment variables
    # load_dotenv()

    filename = os.path.dirname(os.path.abspath(__file__))
    database = "sqlite:///" + os.path.join(filename, "db.sqlite")
    app.config["SQLALCHEMY_DATABASE_URI"] = database
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = 'RahasiaKabupatenSukabumi'
    app.config['ENV'] = 'development'
    app.config['DEBUG'] = True

    db.init_app(app)
    bcrypt.init_app(app)
    # login_manager.init_app(app)

    with app.app_context():
        from .models import user
        from .views import main, auth
        # from .controllers import main_controller, auth_controller

        app.register_blueprint(main.main_bp)
        app.register_blueprint(auth.auth_bp)

        db.create_all()

    return app
