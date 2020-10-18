from flask_login import UserMixin
from initializer import db
from uuid import uuid1

# -----------------------------------------------------------------------------
# DB Models
# -----------------------------------------------------------------------------
# User table
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
        self.id = str(uuid1())
        self.name = name
        self.email = email
        self.password = password
        self.settings_id = str(uuid1())
        self.shopping_id = str(uuid1())
        self.inventory_id = str(uuid1())


class recipe(db.Model):
    __tablename__ = "recipe"
    recipe_id = db.Column(db.String(40), primary_key=True)
    name = db.Column(db.String(150))
    ingredients = db.Column(db.String)
    time_h = db.Column(db.Integer)
    time_min = db.Column(db.Integer)
    cost = db.Column(db.Float)
    preview_text = db.Column(db.String)
    preview_media_url = db.Column(db.String)
    tags = db.Column(db.String)

    def __init__(self, name, ingredients, time_h, time_min, cost, preview_text, preview_media, tags):
        self.recipe_id = str(uuid1())
        self.name = name
        self.ingredients = ingredients
        self.time_h = time_h
        self.time_min = time_min
        self.cost = cost
        self.preview_text = preview_text
        self.preview_media_url = preview_media
        self.tags = tags

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
