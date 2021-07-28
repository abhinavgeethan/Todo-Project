from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
import flask_praetorian
import os

db = SQLAlchemy()
guard=flask_praetorian.Praetorian()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = '9OLWxND4o83j4K4iuopO'
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("://", "ql://", 1)
    app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
    app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}

    from .models import User
    guard.init_app(app,User)
    db.init_app(app)

    # login_manager = LoginManager()
    # login_manager.login_view = 'auth.login'
    # login_manager.init_app(app)


    # @login_manager.user_loader
    # def load_user(user_id):
    #     # since the user_id is just the primary key of our user table, use it in the query for the user
    #     return User.query.get(int(user_id))

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    return app