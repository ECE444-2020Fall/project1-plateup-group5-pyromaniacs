import time
import random
import json
import os
from emailservice import send_email_as_plateup
from flask import jsonify, request, Response
from flask_login import current_user, login_user, login_required, logout_user
from flask_restx import fields, Resource, reqparse
from initializer import api, app, db, login_manager, ma, scheduler, sp_api
from models import User, recipe
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy


# -----------------------------------------------------------------------------
# Configure Namespaces
# -----------------------------------------------------------------------------
plateupR = api.namespace('plate-up', description='PlateUp operations')
userR = api.namespace('user', description='User operations')
loginR = api.namespace('login', description='Login/logout operations')
mailR = api.namespace('mail', description='Mailing operations')
recipeR = api.namespace('recipe', description='Preview of recipe')


# -----------------------------------------------------------------------------
# DB Schemas (Marshmallow)
# -----------------------------------------------------------------------------
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password', 'settings_id', 'shopping_id', 'inventory_id')

class RecipeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'recipe_id', 'name', 'ingredients', 'time_h', 'time_min', 'preview_text', 'preview_media_url')

# Init schemas
user_schema = UserSchema()
users_schema = UserSchema(many=True)
recipe_schema = RecipeSchema()
recipes_schema = RecipeSchema(many=True)

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
        result = {"users": result}
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

        if not sendWelcomeEmail(email, new_user.id):
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
        'email': fields.String,
        'password': fields.String,
    })

    @loginR.doc(description="Logging a user into the system and authenticating for access to deeper APIs.")
    @loginR.expect(resource_fields, validate=True)
    def post(self):
        email = request.json['email']
        password = request.json['password']
        user = User.query.filter_by(email=email).first()

        if user is not None and check_password_hash(user.password, password):
            login_user(user)
            return user_schema.jsonify(user)

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
@recipeR.route('', methods=['GET', 'POST'])
class recipeTable(Resource):
    resourceFields = recipeR.model('Information to get recipe preview', {
        'Name': fields.String,
        'Ingredients': fields.String,
        'time_h' : fields.Integer,
        'time_min': fields.Integer,
        'cost': fields.Float,
        'preview_text' : fields.String,
        'preview_media_url': fields.String,
    })

    __dataBaseLength=0
    __parser=''
    __debug=True
    random_pick=False

    #Retrive JSON stuff
    def __getJson(self, recipeItem):
        recipePreviewText = recipeItem.preview_text
        recipePreviewMedia = recipeItem.preview_media_url
        return recipePreviewText, recipePreviewMedia

    #Search by Name
    def __merge_list(self, oldList, newList):
        in_old = set(oldList)
        in_new = set(newList)
        in_new_not_old=in_new-in_old
        merged_list=oldList+list(in_new_not_old)
        return merged_list

    def __search_in_database_by_keyword_ingredient(self, keywords):
        recipe_found = db.session.query(recipe).filter(recipe.ingredients.like(keywords)).all()
        return recipe_found


    def __search_in_database_by_keyword_name(self, keywords):
        recipe_found = db.session.query(recipe).filter(recipe.name.like(keywords)).all()
        return recipe_found

    def __search_keyword_list_for_search_by_name(self, keyword):
        keyword_list=[]
        keyword_list.append("% "+keyword+" %")
        keyword_list.append("%" + keyword + " %")
        keyword_list.append("% " + keyword + "%")
        keyword_list.append("%" + keyword + "%")
        return keyword_list

    def __search_keyword_list_for_search_by_ingredient(self, keyword):
        keyword_list=[]
        keyword_list.append("%\"" + keyword + "\"%")
        keyword_list.append("%\"" + keyword + " %")
        keyword_list.append("%" + keyword + "\"%")
        keyword_list.append("% "+keyword+" %")
        keyword_list.append("%" + keyword + " %")
        keyword_list.append("% " + keyword + "%")
        keyword_list.append("%" + keyword + "%")
        return keyword_list


    def __search_for_recipes_by_name(self, keyword):
        recipe_list = []
        keywordList = self.__search_keyword_list_for_search_by_name(keyword)
        for i in range(len(keywordList)):
            new_recipe_list = self.__search_in_database_by_keyword_name(keywordList[i])
            recipe_list = self.__merge_list(recipe_list, new_recipe_list)
        return recipe_list

    def __search_for_recipes_by_ingredient(self, keyword):
        recipe_list=[]
        keywordList=self.__search_keyword_list_for_search_by_ingredient(keyword)
        for i in range(len(keywordList)):
            new_recipe_list = self.__search_in_database_by_keyword_ingredient(keywordList[i])
            recipe_list=self.__merge_list(recipe_list, new_recipe_list)
        return recipe_list
    '''
    filterRecipe
    '''
    def __filter_by_cost(self, recipe_list, filter_cost):
        recipe_list = [recipe for recipe in recipe_list if recipe.cost <= int(filter_cost)]
        return recipe_list


    def __filter_by_time(self, recipe_list, filter_time_h, filter_time_min):
        filter_time_h=int(filter_time_h)
        filter_time_min=int(filter_time_min)
        recipe_list_same_h=[recipe for recipe in recipe_list if recipe.time_h == int(filter_time_h) ]
        recipe_list_same_h = [recipe for recipe in recipe_list_same_h if recipe.time_min <= int(filter_time_min)]
        recipe_list = [recipe for recipe in recipe_list if recipe.time_h < int(filter_time_h)]
        recipe_list=recipe_list_same_h+recipe_list
        return recipe_list

    def __filter_recipe(self, recipe_list, filter_cost, filter_time_h, filter_time_min, filter_has_ingredient):
        if len(recipe_list)==0:
            self.random_pick=True
            recipe_list=db.session.query(recipe).all()
        if filter_cost!=None:
            recipe_list=self.__filter_by_cost(recipe_list, filter_cost)
        if filter_time_h != None and filter_time_min!=None:
            recipe_list=self.__filter_by_time(recipe_list, filter_time_h, filter_time_min)
        return recipe_list

    '''
    Debug
    '''
    def __debug_show_table(self):
        list=db.session.query(recipe).all()
        print("current list")
        for i in range(len(list)):
            print(list[i].name)
            print("ingredient"+str(list[i].ingredients))
        print("end")

    def __debug_add_recipe(self):
        data = [{'apple': 1}]
        data_json=json.dumps(data)
        data2 = [{'driedapple': 2}]
        data2_json = json.dumps(data2)
        data3 = [{'apple juice': 3}]
        data3_json = json.dumps(data3)
        data4 = [{'processed apple process': 4}]
        data4_json = json.dumps(data4)
        data5 = [{'trappletr': 5}]
        data5_json = json.dumps(data5)
        new_recipe1 = recipe('us_meal', data_json, 1, 12, 100, data_json, data_json)
        new_recipe2 = recipe('chinese_meal', data2_json, 2, 12, 200, data2_json, data2_json)
        new_recipe3 = recipe('uk_meal', data3_json, 3, 23, 300, data3_json, data3_json)
        new_recipe4 = recipe('french_meal', data4_json, 4, 45, 400,  data4_json, data4_json)
        new_recipe5 = recipe('russia_meal', data5_json, 5, 50, 500, data5_json, data5_json)
        db.session.add(new_recipe1)
        db.session.add(new_recipe2)
        db.session.add(new_recipe3)
        db.session.add(new_recipe4)
        db.session.add(new_recipe5)
        db.session.commit()

    def __debug_clear_table(self):

        db.session.query(recipe).delete()

    #insert recipe to database
    @recipeR.doc(description="Insert recipe to database")
    @recipeR.expect(resourceFields, validate=True)
    def post(self):
        new_recipe_name=request.json["Name"]
        new_recipe_ingredients=request.json["Ingredients"]
        new_recipe_time_h =request.json["time_h"]
        new_recipe_time_min = request.json["time_min"]
        new_recipe_cost = request.json["cost"]
        new_recipe_preview_text = request.json["preview_text"]
        new_recipe_preview_media_url = request.json["preview_media_url"]

        if new_recipe_time_min>60:
            new_recipe_time_h=new_recipe_time_h+int(new_recipe_time_min/60)
            new_recipe_time_min=new_recipe_time_min%60

        new_recipe=recipe(new_recipe_name, new_recipe_ingredients, new_recipe_time_h,\
                          new_recipe_time_min, new_recipe_cost, new_recipe_preview_text,\
                          new_recipe_preview_media_url)

        db.session.add(new_recipe)
        db.session.commit()
        if self.__debug:
            self.__debug_show_table()
        return Resource("recipe inserted!", status=200)


    #search recipe by Name and Filter (Filter not implement yet)
    #Example: http://127.0.0.1:5000/recipe?Name=%22meal%22&Ingredients=%22meal%22&Filter_time_h=10&Filter_time_min=0&Filter_cost=10000&Page=0&Limit=2
    @recipeR.doc(description="Get recipe preview json by name and filter")
    def get(self):
        #get params
        recipe_list = []
        recipe_name=request.args.get('Name')
        ingredients=request.args.get('Ingredients')
        filter_time_h= request.args.get('Filter_time_h')
        filter_time_min = request.args.get('Filter_time_min')
        filter_cost = request.args.get('Filter_cost')
        filter_has_ingredients = request.args.get('Filter_has_ingredients')
        limit=int(request.args.get('Limit'))
        page=int(request.args.get('Page'))

        if self.__debug==True:
            #self.__debug_clear_table()
            #self.__debug_add_recipe()
            self.__debug_show_table()

        self.random_pick=False
        #get list
        recipe_list_name=[]
        recipe_list_ingredient=[]
        if recipe_name!=None:
            recipe_list_name=self.__search_for_recipes_by_name(recipe_name)
        if ingredients!=None:
            recipe_list_ingredient=self.__search_for_recipes_by_ingredient(ingredients)

        recipe_list=self.__merge_list(recipe_list_name, recipe_list_ingredient)
        recipe_list = self.__filter_recipe(recipe_list, filter_cost, filter_time_h, filter_time_min, filter_has_ingredients)

        #random list
        if self.random_pick:
            recipe_list = random.sample(recipe_list, k=min(len(recipe_list),int(limit)))

        recipe_list=recipe_list[page*limit : page*limit+limit]
        return_result=recipes_schema.dump(recipe_list)
        
        return_dict = {"recipes": return_result, "is_random": self.random_pick}
        return jsonify(return_dict)


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
def fetchRecipes():
    print("fetching recipes...")
    i = 0
    while os.path.exists("recipes/recipes%s.json" % i):
        i += 1

    response = sp_api.get_random_recipes(number=100)

    with open('recipes/recipes%s.json' % i, 'w') as outfile:
        json.dump(response.json(), outfile, ensure_ascii=False, indent=2)
        
    # do some process
    time.sleep(10)
    print("done fetching recipes.")

@scheduler.scheduled_job('interval', seconds=4000)
def updateRecipesToDB():
    print("updating recipes...")

    i = 0
    while os.path.exists("recipes/recipes%s.json" % i):
        with open('recipes/recipes%s.json' % i, 'w') as outfile:
            json.load(outfile)
            
            i += 1

       
    # do some process
    time.sleep(30)
    print("done updating recipes.")



# Run Server
if __name__ == '__main__':
    db.create_all()
    scheduler.start()
    app.run(host='0.0.0.0')

    # Terminate background tasks
    scheduler.shutdown()
