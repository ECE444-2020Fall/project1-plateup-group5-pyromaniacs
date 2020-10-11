import time
import random
import json
from emailservice import send_email_as_plateup
from flask import jsonify, request, Response
from flask_login import current_user, login_user, login_required, logout_user
from flask_restx import fields, Resource, reqparse
from initializer import api, app, db, login_manager, ma, scheduler
from models import User, Recipe_preview
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy

# -----------------------------------------------------------------------------
# Configure Namespaces
# -----------------------------------------------------------------------------
plateupR = api.namespace('plate-up', description='PlateUp operations')
userR = api.namespace('user', description='User operations')
loginR = api.namespace('login', description='Login/logout operations')
mailR = api.namespace('mail', description='Mailing operations')
Recipe_previewR = api.namespace('Recipe_preview', description='Preview of recipe')


# -----------------------------------------------------------------------------
# DB Schemas (Marshmallow)
# -----------------------------------------------------------------------------
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'settings_id', 'shopping_id', 'inventory_id')

class RecipeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'recipe_id', 'name', 'ingredient', 'time', 'preview_text', 'preview_media')

# Init schemas
user_schema = UserSchema()
users_schema = UserSchema(many=True)
recipe_schema = RecipeSchema()


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
        return jsonify(result)

    # @login_required
    @userR.doc(description="Register a new user to the system with complete information.")
    @userR.expect(resource_fields, validate=True)
    def post(self):
        name = request.json['name']
        email = request.json['email']
        password = generate_password_hash(request.json['password'], "pbkdf2:sha256")

        currEmails = flat_list(User.query.with_entities(User.email).all())
        if email in currEmails:
            return Response("Sorry, this user with email " + email + " already exists! Please log in instead.", status=409)

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
        'id': fields.String,
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
            return Response("Login successful. User %s" % userId, status=200)

        return Response("403 Forbidden", status=403)

    @loginR.doc(description="Logging current user out.")
    def delete(self):
        userId = current_user.id
        logout_user()
        return Response("Logout successful. User %s" % userId, status=200)


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
            return Response("OK - Mail Sent!", status=200)

        return Response("NOT OK - Mail NOT Sent!", status=400)

# Recipe-preview API
@Recipe_previewR.route('')
class recipe_table(Resource):
    resource_fields = Recipe_previewR.model('Information to get recipe preview', {
        'Name': fields.String,
        'Ingredient': fields.String,
        'Filter_time' : fields.Integer,
        'Filter_cost': fields.Integer,
        'Filter_has_ingredient' : fields.Boolean,
        'Limit': fields.Integer,
        'Page': fields.Integer,
    })

    __dataBaseLength=0
    __parser=''
    __debug=True
    randomPick=False

    #Retrive JSON stuff
    def __getJson(self, recipeItem):
        recipePreviewText = recipeItem.preview_text
        recipePreviewMedia = recipeItem.preview_media
        return recipePreviewText, recipePreviewMedia

    #Search by Name
    def __searchForRecipesByName(self, keyword):
        idList=[]
        keywords="%"+keyword+"%"
        recipeList=db.session.query(Recipe_preview).filter(Recipe_preview.name.like(keywords)).all()
        return recipeList
    '''
    filterRecipe
    '''
    def __filterByCost(self, recipeList, filter_cost):
        recipeList = [recipe for recipe in recipeList if recipe.cost <= filter_cost]
        return recipeList


    def __filterByTime(self, recipeList, filter_time):
        recipeList = [recipe for recipe in recipeList if recipe.time <= filter_time]
        return recipeList

    def __filterRecipe(self, recipeList, filter_cost, filter_time, filter_has_ingredient):
        if len(recipeList)==0:
            self.randomPick=True
            recipeList=db.session.query(Recipe_preview).all()
        recipeList=self.__filterByCost(recipeList, filter_cost)
        recipeList=self.__filterByTime(recipeList, filter_time)
        return recipeList

    '''
    Debug
    '''
    def __debug_showList(self):
        list=db.session.query(Recipe_preview).all()
        print("current list")
        for i in range(len(list)):
            print(list[i].name)
            print("cost"+str(list[i].cost))
            print("time"+str(list[i].time))
        print("end")

    def __debug_add_recipe(self):
        data = [{'a': 1}]
        data_json=json.dumps(data)
        data2 = [{'a': 2}]
        data2_json = json.dumps(data2)
        data3 = [{'a': 3}]
        data3_json = json.dumps(data3)
        data4 = [{'a': 4}]
        data4_json = json.dumps(data4)
        data5 = [{'a': 5}]
        data5_json = json.dumps(data5)
        new_recipe1 = Recipe_preview('us_meal', data_json, 10, 100, data_json, data_json)
        new_recipe2 = Recipe_preview('chinese_meal', data2_json, 20,200, data2_json, data2_json)
        new_recipe3 = Recipe_preview('uk_meal', data3_json, 30, 300, data3_json, data3_json)
        new_recipe4 = Recipe_preview('french_meal', data4_json, 40, 400,  data4_json, data4_json)
        new_recipe5 = Recipe_preview('russia_meal', data5_json, 50, 500, data5_json, data5_json)
        db.session.add(new_recipe1)
        db.session.add(new_recipe2)
        db.session.add(new_recipe3)
        db.session.add(new_recipe4)
        db.session.add(new_recipe5)
        db.session.commit()

    def __debug_clear_table(self):
        db.session.query(Recipe_preview).delete()

    #search recipe by Name and Filter (Filter not implement yet)
    @Recipe_previewR.doc(description="Get recipe preview json by name and filter")
    @Recipe_previewR.expect(resource_fields, validate=True)
    def post(self):
        #get id List
        recipeList = []
        recipeName=request.json['Name']
        ingredient=request.json['Ingredient']
        filter_time=request.json['Filter_time']
        filter_cost = request.json['Filter_cost']
        filter_has_ingredient = request.json['Filter_has_ingredient']
        limit=request.json['Limit']
        page=request.json['Page']

        if self.__debug==True:
            self.__debug_clear_table()
            self.__debug_add_recipe()
            self.__debug_showList()

        self.randomPick=False
        #get list
        if recipeName!=None:
            recipeList=self.__searchForRecipesByName(recipeName)
        recipeList = self.__filterRecipe(recipeList, filter_cost, filter_time, filter_has_ingredient)

        #random list
        if self.randomPick:
            recipeList = random.choices(recipeList, k=min(len(recipeList),limit))

        #get JSON file by ID list by limit(control by j)
        recipePreviewTextList=[]
        recipePreviewMediaList=[]
        j=1

        for i in range(page*limit, len(recipeList)):
            previewText, previewMedia=self.__getJson(recipeList[i])
            recipePreviewTextList.append(previewText)
            recipePreviewMediaList.append(previewMedia)
            j=j+1
            if (j>limit):
                break
        print(jsonify(recipePreviewMediaList))
        return jsonify(recipePreviewMediaList, recipePreviewTextList, self.randomPick)


# -----------------------------------------------------------------------------
# Utility functions
# -----------------------------------------------------------------------------
def flat_list(l):
    return ["%s" % v for v in l]


# callback to reload the user object
@login_manager.user_loader
def load_user(uid):
    return User.query.get(uid)


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
