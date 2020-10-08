from flask import Response, request, jsonify
from flask_restx import Resource, fields
from flask_login import login_user, logout_user, login_required, current_user
from sqlalchemy_utils import create_database, database_exists
from werkzeug.utils import cached_property
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from models import User
from emailservice import send_email_as_plateup
from initializer import app, db, ma, api, login_manager, scheduler

import os
import json
import requests
import time

# -----------------------------------------------------------------------------
# Configure Namespaces
# -----------------------------------------------------------------------------
plateupR = api.namespace('plate-up', description='PlateUp operations')
userR = api.namespace('user', description='User operations')
loginR = api.namespace('login', description='Login/logout operations')
mailR = api.namespace('mail', description='Mailing operations')

# -----------------------------------------------------------------------------
# DB Schemas (Marshmallow)
# -----------------------------------------------------------------------------
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'settings_id', 'shopping_id', 'inventory_id')

# Init schemas
user_schema = UserSchema()
users_schema = UserSchema(many=True)


# -----------------------------------------------------------------------------
# Flask API start
# -----------------------------------------------------------------------------
@plateupR.route("")
class Main(Resource):
    @login_required
    def get(self):
        return "Hello! This is the backend for PlateUp - a chef's co-pilot."

# User API
@userR.route('')
class UserAPI(Resource):
    resource_fields = userR.model('User Information', {
        'name': fields.String,
        'email': fields.String,
        'password': fields.String,
    })

    # @login_required
    @userR.doc(description="Get information for all users.")
    def get(self):
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify(result.data)

    # @login_required
    @userR.doc(description="Register a new user to the system with complete information.")
    @userR.expect(resource_fields, validate=True)
    def post(self):    
        name = request.json['name']
        email = request.json['email']
        password = generate_password_hash(request.json['password'], "pbkdf2:sha256")

        currEmails = flat_list(User.query.with_entities(User.email).all())
        if email in currEmails:
            return Response("Sorry, this user with email " + email + " already exists! Please log in instead.")

        new_user = User(name, email, password)

        db.session.add(new_user)
        db.session.commit()

        userID = User.query.filter_by(email=email).first().id
        if not sendWelcomeEmail(email, userID):
            return Response("Mail NOT Sent!", status=400)

        return user_schema.jsonify(new_user)
    
    # @login_required
    @userR.doc(description="WARNING: Delete all user information stored in the database.")
    def delete(self):
        num_rows_deleted = db.session.query(User).delete()
        db.session.commit()
        return "%i records deleted." % num_rows_deleted


# Login API
@loginR.route('')
class Login(Resource):
    resource_fields = userR.model('Login Information', {
        'id': fields.Integer,
        'password': fields.String,
    })

    @loginR.doc(description="Logging a user into the system and authenticating for access to deeper APIs.")
    @loginR.expect(resource_fields, validate=True)
    def post(self):
        userId = request.json['id']
        password = request.json['password']
        user = User.query.get(userId)
                    
        if user is not None and check_password_hash(user.password, password):
            login_user(user)
            return Response("Login successful. User %s"% userId, status=200)

        return Response("403 Forbidden", status=403)

    @loginR.doc(description="Logging current user out.")
    def delete(self):
        logout_user(current_user)
        return Response("Login successful. User %s"%current_user.id, status=200)


# Mail API
@mailR.route('')
class Mail(Resource):
    # @login_required
    @mailR.doc(description="Sends a welcome email to user with their client ID and default password information (Development Email Only).")
    @mailR.param("userID")
    def get(self):
        userID = request.args.get("userID")
        receipient = User.query.get(userID).email
        
        if sendWelcomeEmail(receipient, userID):
            return Response("200 OK - Mail Sent!")

        return Response("400 NOT OK - Mail NOT Sent!")


# -----------------------------------------------------------------------------
# Utility functions
# -----------------------------------------------------------------------------
def flat_list(l):
    return ["%s" % v for v in l]

# callback to reload the user object
@login_manager.user_loader
def load_user(uid):
    return User.query.get(int(uid))

# sends the welcome email
def sendWelcomeEmail(receipient, userID):
    user = User.query.get(userID)
    name = user.name
    password = user.password
    email = user.email

    subject = 'Welcome to PlateUp - %s' % name
    body = '''
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <!-- converted from rtf -->
    <style>
        <!-- .EmailQuote { margin-left: 1pt; padding-left: 4pt; border-left: #800000 2px solid; } -->
    </style>
    </head>
    <body>
    <font face="Calibri" size="2">
        <span style="font-size:20pt;color:red">
            Welcome to PlateUp by Team 5! Congratulations on taking your first step towards making your cooking journey easier. You will need the following information for future access to your account. <br>
            <br>
            Your email: %s <br>
            Your userID: %s <br>
            Your password: %s <br>
            <br>
            Click HERE to change your password. <br>
            <br>
            You will need your user ID and password to sign in whenever you use your PlateUp account. Do not share your password with anyone.
            Happy Cooking!
        </span>
    </font>
    </body>
    </html>''' % (email, str(userID), password)
    
    return send_email_as_plateup(receipient, subject, body)

# -----------------------------------------------------------------------------
# Background tasks
# -----------------------------------------------------------------------------
# update stuff as a scheduled job while server is active
@scheduler.scheduled_job('interval', seconds=3600)
def updateRecipes():
    print("updating recipes...")
    # do some process
    time.sleep(10)
    print("done updating recipes.")


# Run Server
if __name__ == '__main__':
    db.create_all()
    scheduler.start()
    app.run(host='0.0.0.0', debug=True)
  
    # Terminate background tasks
    scheduler.shutdown()