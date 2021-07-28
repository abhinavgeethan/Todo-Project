from flask import Blueprint, render_template,request
from .models import Todos, User
import dateutil
from . import db,guard
import flask_praetorian

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/login', methods=['POST'])
def login_post():
    data=request.get_json()
    username = data['username']
    password = data['password']

    #user = User.query.filter_by(username=username).first()

    # flash('Please check your login details and try again.')

    user=guard.authenticate(username, password)
    print("LoggedIn")
    return {"loggedIn":True,"name":user.name,"id":user.id,"access_token":guard.encode_jwt_token(user)},200

@auth.route('/signup', methods=['POST'])
def signup_post():
    data=request.get_json()
    email = data['email']
    username = data['username']
    name = data['name']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user:
        return {"error":"UserExists","message":"User with same email id already exists."},400
    
    user = User.query.filter_by(username=username).first()

    if user:
        return {"error":"UserExists","message":"User with same username already exists."},400

    password=guard.hash_password(password)
    new_user = User(username=username,email=email, name=name, password=password,roles='user')

    db.session.add(new_user)
    db.session.commit()

    user = User.query.filter_by(email=email).first()
    return {"signedup":True,"username":user.username,"name":user.name,"id":user.id} if user else {"signedup":False,"username":None,"name":None},201

@auth.route('/refresh',methods=['POST'])
def refresh():
    print("Refresh Request")
    old_token=request.get_data()
    new_token=guard.refresh_jwt_token(old_token)
    return {"access_token":new_token},200

@auth.route('/data/fetch')
@flask_praetorian.auth_required
def fetch_data():
    user_id=flask_praetorian.current_user().id
    name=flask_praetorian.current_user().name
    data=[{"id":x.id, "user_id":x.user_id, "text":x.text, "datetime":x.datetime, "completed":x.completed} for x in Todos.query.filter_by(user_id=user_id).all()]
    if len(data)<1:
        return {"data":[{"user_id":user_id,"name":name}]}
    return {"data":data,"name":name}

@auth.route('/data/delete',methods=['POST'])
@flask_praetorian.auth_required
def delete_todo():
    cur_user_id=flask_praetorian.current_user().id
    data=request.get_json()
    todo_id=data['id']
    user_id=data['user_id']
    if cur_user_id!=user_id:
        return {"error":"User id mismatch"},403
    todo=Todos.query.filter_by(id=todo_id,user_id=user_id).first()
    db.session.delete(todo)
    db.session.commit()
    return {"deleted":True}

@auth.route('/data/add',methods=['POST'])
@flask_praetorian.auth_required
def add_todo():
    cur_user_id=flask_praetorian.current_user().id
    data=request.get_json()
    id=data['id']
    user_id=data['user_id']
    text=data['text']
    datetime=dateutil.parser.parse(data['datetime'])
    completed=data['completed']
    if cur_user_id!=user_id:
        return {"error":"User id mismatch"},403
    todo_check=Todos.query.filter_by(id=id,user_id=user_id).first()
    if todo_check:
        return {"error":"Todo Exists"},404
    new_todo=Todos(id=id,user_id=user_id,text=text,datetime=datetime,completed=completed)
    db.session.add(new_todo)
    db.session.commit()
    todo_check=Todos.query.filter_by(id=id,user_id=user_id).first()
    if todo_check:
        ret=[{"id":todo_check.id,"user_id":todo_check.user_id,"text":todo_check.text,"datetime":todo_check.datetime,"completed":todo_check.completed}]
        return {"added":True,"data":ret}

@auth.route('/data/update',methods=['POST'])
@flask_praetorian.auth_required
def update_todo():
    cur_user_id=flask_praetorian.current_user().id
    data=request.get_json()
    id=data['id']
    user_id=data['user_id']
    completed=data['completed']
    if cur_user_id!=user_id:
        return {"error":"User id mismatch"},404
    todo=Todos.query.filter_by(id=id,user_id=user_id).first()
    todo.completed=completed
    db.session.commit()
    todo_check=Todos.query.filter_by(id=id,user_id=user_id).first()
    if todo_check.completed==completed:
        return {"updateCompleted":True,"currentValue":todo_check.completed}