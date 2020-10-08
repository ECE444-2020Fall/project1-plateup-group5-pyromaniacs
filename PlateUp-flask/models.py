import json
import datetime

from flask_login import UserMixin
from sqlalchemy.orm import relationship
from initializer import db
from uuid import uuid1

# -----------------------------------------------------------------------------
# DB Models
# -----------------------------------------------------------------------------
# user table
class User(db.Model, UserMixin):
    __tablename__ = "user"

    id = db.Column(db.String(40), primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(40))
    password = db.Column(db.String)
    settings_id = db.Column(db.String(40))
    shopping_id = db.Column(db.String(40))
    inventory_id = db.Column(db.String(40))

    def __init__(self, name, email, password):
        self.id = uuid1()
        self.name = name
        self.email = email
        self.password = password
        self.settings_id = uuid1()
        self.shopping_id = uuid1()
        self.inventory_id = uuid1()

# shopping table
class ShoppingList(db.Model):
    __tablename__ = "shoppinglist"

    id = db.Column(db.String(40), db.ForeignKey('user.shopping_id'), primary_key=True)
    ingredient_name = db.Column(db.String(50))
    quantity = db.Column(db.Integer)

    def __init__(self, id, ingredient_name, quantity):
        self.id = id
        self.ingredient_name = ingredient_name
        self.quantity = quantity
        