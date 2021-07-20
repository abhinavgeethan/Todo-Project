from typing import DefaultDict
from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True,nullable=False) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True,nullable=False)
    password = db.Column(db.String(100),nullable=False)
    name = db.Column(db.String(1000),nullable=False)
    username=db.Column(db.String(20),unique=True,nullable=False)
    roles=db.Column(db.Text)
    is_active=db.Column(db.Boolean,default=True, server_default='true')

    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return []


    @classmethod
    def lookup(cls,username):
        return cls.query.filter_by(username=username).one_or_none()

    @classmethod
    def identify(cls,id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    def is_valid(self):
        return self.is_active
    
class Todos(db.Model):
    id=db.Column(db.String(50),unique=True,primary_key=True,nullable=False)
    user_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    text=db.Column(db.Text,nullable=False)
    datetime=db.Column(db.DateTime,nullable=False)
    completed=db.Column(db.Boolean, default=False,nullable=False)
