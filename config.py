import pymongo as pm

connection=pm.MongoClient("mongodb://localhost:27017/")
dab=connection["WEBAUTH_TESTER"]
