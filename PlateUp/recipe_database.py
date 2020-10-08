'''
Support database
    Recipe data base:
        | id| recipe_id | name| ingredient| time | preview_text| preview_media|
        / int / int / varchar / JSON / int / JSON / JSON /
Function to call:
    After create instance " recipe_table "
    search recipe by keyword:
        get_recipe_list(self, keyword, limit, page)
            page start at 0, limit is the limit for each page
            set keyword = None to get random recipe

    To do: add a filter function to the get_recipe_list

'''
import pymysql
import random

class recipe_table:
    __dataBaseLength=0
    __database=''
    __cursor=''
    __recipe_preview_json_column_id=5

    def __init__(self):
        self.__database=pymysql.connect("localhost","root","ece444group5","recipe" )
        self.__cursor = self.__database.cursor()
        self.__dataBaseLength = self.__cursor.execute("select * from recipe")

    #SQL stuff to get json by recipe id
    def __getJsonByID(self, ID):
        sql = "SELECT * FROM recipe WHERE id = %s;" % ID
        jsonGot=None
        try:
            self.__cursor.execute(sql)
            result=self.__cursor.fetchall()
            jsonGot=result[0][self.__recipe_preview_json_column_id]
        except:
            print('something went wrong for getting json by id')
        return jsonGot

    #call the IR function, but now just a dummy one
    def __searchForRecipeID(self, keyword):
        id=[]
        result=[]
        #set up sql search engin
        search_keyword="'%"+keyword+"%'"
        sql = "SELECT * FROM recipe WHERE name like %s;" % search_keyword

        try:
            self.__cursor.execute(sql)
            result = self.__cursor.fetchall()
        except:
            print('something went wrong for searching id')

        for i in range(len(result)):
            id.append(result[i][0])
        return id

    #search recipe by keyword
    def get_recipe_list(self, keyword, limit, page):
        #get id List
        idList = []
        if keyword!=None:
            idList=self.__searchForRecipeID(keyword)
        else:
            idList = random.sample(range(1, self.__dataBaseLength), limit)

        #get JSON file by ID list by limit(control by j)
        recipeJsonList=[]
        j=1
        for i in range(page*limit, len(idList)):
            recipeJsonList.append(self.__getJsonByID(idList[i]))
            j=j+1
            if (j>limit):
                break

        return recipeJsonList

def unitTest():
    db=recipe_table()
    jsonList=db.get_recipe_list(keyword=None,limit=2, page=0)
    for i in range(len(jsonList)):
        print(jsonList[i])


if __name__ == '__main__':
    unitTest()

