import json
import os
import pytest
import sys

from pathlib import Path
from initializer import api, app, db, login_manager, ma, scheduler, sp_api
from models import User, Recipe, Instruction, ShoppingList
from run import UserSchema, RecipeSchema, InstructionSchema

sys.path.insert(1, os.path.join(sys.path[0], '..'))

BASE_DIR = Path(__file__).resolve().parent
TEST_DB = os.path.join(BASE_DIR, 'test_db.sqlite')
app.config["EMAIL"] = "noreply.plateup@gmail.com"
app.config["PASSWORD"] = "test-pw"


################################################################################
# Implemented by Kevin Zhang for Lab 6 - 2020/10/19
################################################################################
@pytest.fixture
def client():
    # Database setup
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///' + TEST_DB
    db.create_all()

    # Add test user
    test_user = User("Test", app.config["EMAIL"], app.config["PASSWORD"])
    app.config["TEST_USER_ID"] = test_user.id
    db.session.add(test_user)
    db.session.commit()

    # Run tests
    yield app.test_client()

    # Teardown
    db.drop_all()


def login(client, email, password):
    """ Login helper function. """
    return client.post("/login", json=dict(email=email, password=password))


def logout(client):
    """ Logout helper function. """
    return client.delete("/login", follow_redirects=True)


def post_recipe(client, recipe):
    """ Post recipe helper function. """
    return client.post("/recipe", json=recipe)


def get_recipes(client, query=""):
    """ Get recipes helper function. """
    return client.get(f"/recipe{query}")


def test_database(client):
    """ Initial test. ensure that the database exists. """
    tester = Path(TEST_DB).is_file()
    assert tester


def test_success_login_logout(client):
    """ Test login and logout using helper functions. """
    rv = login(client, app.config["EMAIL"], app.config["PASSWORD"])
    assert rv.json["email"] == app.config["EMAIL"]

    rv = logout(client)
    assert rv.data == ('Logout successful. User %s' % app.config["TEST_USER_ID"]).encode()


def test_failure_login_logout(client):
    """ Test (failed) login and logout using helper functions. """
    rv = login(client, app.config["EMAIL"] + "x", app.config["PASSWORD"])
    assert rv.status == "403 FORBIDDEN"

    rv = login(client, app.config["EMAIL"], app.config["PASSWORD"] + "x")
    assert rv.status == "403 FORBIDDEN"


################################################################################
# Implemented by Eliano Anile for Lab 6 - 2020/10/26
################################################################################
def test_add_recipe(client):
    """ Test adding a recipe to the database. """
    rv = login(client, app.config["EMAIL"], app.config["PASSWORD"])
    assert rv.json["email"] == app.config["EMAIL"]

    rv = post_recipe(client, {
        "Name": "Test recipe name",
        "Ingredients": json.dumps([{"Test ingr 1": 6, "Test ingr 2": "1.5 Tbs"}]),
        "time_h": 1,
        "time_min": 30,
        "cost": 1000.0,
        "preview_text": "Test preview string",
        "preview_media_url": "https://testurl.com/img/test.jpg",
        "tags": "vegetarian, vegan"
    })

    assert rv.status == "200 OK"

    rv = get_recipes(client)
    assert rv.status == "200 OK"
    assert len(rv.json["recipes"]) == 1


def test_get_random_recipes(client):
    """ Test getting random recipes from the database (i.e. no search keywords
        or filters specified).
    """
    rv = login(client, app.config["EMAIL"], app.config["PASSWORD"])
    assert rv.json["email"] == app.config["EMAIL"]

    rv = get_recipes(client)
    assert rv.status == "200 OK"
    assert rv.json["is_random"]
