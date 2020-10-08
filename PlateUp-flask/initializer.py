from flask import Flask, url_for
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
from flask_restplus import Api
from flask_login import LoginManager
from apscheduler.schedulers.background import BackgroundScheduler
import os
import urllib3

# Disable SSL warning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Init app
app = Flask("PlateUp")
basedir = os.path.abspath(os.path.dirname(__file__))

# Database set up
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://username:password@localhost/db_name"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(4)

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)

# Bypass HTTPS vs HTTP issue for swagger documentation
@property
def specs_url(self):
    return url_for(self.endpoint('specs'), _external=True, _scheme='https')

Api.specs_url = specs_url

api = Api(app, version='1.1', title='PLATEUP API', description='The backend API for PlateUp, a chef\'s co-pilot!')

# Init login manager
login_manager = LoginManager()
login_manager.init_app(app)

# Init Schedular for background updates
scheduler = BackgroundScheduler()
