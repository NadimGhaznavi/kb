---
title: Handling Floating Point Math with Python and MongoDb
layout: default
---

### Introduction and Scope 

This page documents the use case of handling floating point arithmetic with at least 12 decimal places in MongoDb using Python. This is a special case, because the default datatype for floating point numbers in Python is the *float* datatype. Arithmetic operations with high precision floats i.e. 12 or more decimal places yields incorrect results when using the Python *float* data type.

### Storing High Precision Floats in MongoDb

High precision floats should be stored using the MongoDb *Decimal128* data type. This is a standard datatype for MongoDb.

### Reading and Writing High Precision Floats to MongoDb using Python

The code below shows:

* How to create a MongoDb document with a Decmial128 value
* How to retrieve that value from MongoDb
* How to perform addition with that value in Python
* How to write the result of the addition back to MongoDb

```
from pymongo import MongoClient
from bson.decimal128 import Decimal128

# MongoDB server hostname
mongodb_server = "kermit.osoyalce.com"
# Default MongoDb port number
mongodb_port = 27017
# Example MongoDb database name
mongodb_db_name = "my_db"
# Example MongoDb collection name
mongodb_collection_name = "my_col"

# Open a connection to MongoDb
db_client = MongoClient(f"mongodb://{mongodb_server}:{mongodb_port}/")
# Get the database handle
mongo_db = db_client[mongo_db_name]
# Get the collection handle
mongo_collection = mongo_db[mongodb_collection_name]

# High precision floating point number as a string datatype
string_num = "0.123456789012"
# High precision floating point number as a Decimal128 datatype
decimal128_num = Decimal128(string_num)

# A MongoDb document in BSON format
some_doc = {
  'some_name': 'high_precision_example_doc',
  'some_num': decimal128_num
}

### Insert some_doc into MongoDb
mongo_collection.insert_one(some_document)

### Retrieve the value from MongoDb
cur_doc = mining_col.find_one({'some_name': 'high_precision_example_doc'})
cur_value = cur_doc['some_num']

### Do high precision floating point math without rounding errors

# We will add "0.000000000001" to the current value
# NOTE: Decimal128 does not support the addition (+) operator
# NOTE: MongodDb does not support the Python decmial datatype

# We need to convert Decimal128 datatype to the decimal datatype
# Then do the addition, then convert it back to Decimal128
new_num = Decimal128(cur_value.to_decimal() + Decimal128("0.000000000001").to_decimal())

### Update the value
# Query to retrieve the newly created document
my_query = {'some_name': 'high_precision_example_doc'}
# Specify which key/value pair to update
new_value = { "$set": { 'some_num': new_num }}

# Update the number in MongoDb
mongo_collection.update_one(my_query, new_value)
```


