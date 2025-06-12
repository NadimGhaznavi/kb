---
title: PyMongo
layout: default
---

# Table of Contents

* [Introduction and Scope](#introduction-and-scope)
* [Making a Connection with MongoClient](#making-a-connection-with-mongoclient)
* [Retrieving a Collection](#getting-a-collection)
* [A Document with a Current Timestamp](#a-document-with-a-current-timestamp)
* [Inserting a Document](#inserting-a-document)
* [Retrieving a Single Document with find_one](#retrieving-a-single-document-with-find_one)
* [Querying for More Than One Document](#querying-for-more-than-one-document)
* [Counting](#counting)
* [Links](#links)

# Introduction and Scope

This document provides excerpts from the [PyMongo Documentation Homepage](https://pymongo.readthedocs.io/en/stable/). 

# Making a Connection with MongoClient

The first step when working with PyMongo is to create a [MongoClient](https://pymongo.readthedocs.io/en/stable/api/pymongo/mongo_client.html#pymongo.mongo_client.MongoClient) to the running mongod instance. Doing so is easy:

```
from pymongo import MongoClient
client = MongoClient()
```

The above code will connect on the default host and port. We can also specify the host and port explicitly, as follows:

```
client = MongoClient("localhost", 27017)
```

Or use the MongoDB URI format:

```
client = MongoClient("mongodb://localhost:27017/")
```

# Retrieving a Collection

A [collection](https://www.mongodb.com/docs/manual/core/databases-and-collections) is a group of documents stored in MongoDB, and can be thought of as roughly the equivalent of a table in a relational database. Getting a collection in PyMongo works the same as getting a database:

```
collection = db.test_collection
```

or (using dictionary style access):

```
collection = db["test-collection"]
```

An important note about collections (and databases) in MongoDB is that they are created lazily - none of the above commands have actually performed any operations on the MongoDB server. Collections and databases are created when the first document is inserted into them.

# A Document with a Current Timestamp

Data in MongoDB is represented (and stored) using JSON-style documents. In PyMongo we use dictionaries to represent documents. As an example, the following dictionary might be used to represent a blog post:

```
import datetime
post = {
    "author": "Mike",
    "text": "My first blog post!",
    "tags": ["mongodb", "python", "pymongo"],
    "date": datetime.datetime.now(tz=datetime.timezone.utc),
}
```

Note that documents can contain native Python types (like [datetime.datetime](https://docs.python.org/3/library/datetime.html#datetime.datetime) instances) which will be automatically converted to and from the appropriate [BSON](https://bsonspec.org/) types.

# Inserting a Document

To insert a document into a collection we can use the [insert_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.insert_one) method:

```
posts = db.posts
post_id = posts.insert_one(post).inserted_id
post_id
ObjectId('...')
```

When a document is inserted a special key, "_id", is automatically added if the document doesn’t already contain an "_id" key. The value of "_id" must be unique across the collection. [insert_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.insert_one) returns an instance of [InsertOneResult](https://pymongo.readthedocs.io/en/stable/api/pymongo/results.html#pymongo.results.InsertOneResult). For more information on "_id", see the [documentation on _id](https://www.mongodb.com/docs/manual/reference/method/ObjectId/).

After inserting the first document, the posts collection has actually been created on the server. We can verify this by listing all of the collections in our database:

```
db.list_collection_names()
['posts']
```

# Retrieving a Single Document With find_one

(https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one)
The most basic type of query that can be performed in MongoDB is [find_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one). This method returns a single document matching a query (or None if there are no matches). It is useful when you know there is only one matching document, or are only interested in the first match. Here we use [find_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one) to get the first document from the posts collection:

```
import pprint
pprint.pprint(posts.find_one())
{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['mongodb', 'python', 'pymongo'],
 'text': 'My first blog post!'}
```

The result is a dictionary matching the one that we inserted previously.

Note

The returned document contains an "_id", which was automatically added on insert.

[find_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one) also supports querying on specific elements that the resulting document must match. To limit our results to a document with author “Mike” we do:

```
pprint.pprint(posts.find_one({"author": "Mike"}))
{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['mongodb', 'python', 'pymongo'],
 'text': 'My first blog post!'}
```

If we try with a different author, like “Eliot”, we’ll get no result:

```
posts.find_one({"author": "Eliot"})
```

# Querying for More Than One Document

To get more than a single document as the result of a query we use the [find()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find) method. [find()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find) returns a [Cursor](https://pymongo.readthedocs.io/en/stable/api/pymongo/cursor.html#pymongo.cursor.Cursor) instance, which allows us to iterate over all matching documents. For example, we can iterate over every document in the posts collection:

```
for post in posts.find():
    pprint.pprint(post)

{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['mongodb', 'python', 'pymongo'],
 'text': 'My first blog post!'}
{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['bulk', 'insert'],
 'text': 'Another post!'}
{'_id': ObjectId('...'),
 'author': 'Eliot',
 'date': datetime.datetime(...),
 'text': 'and pretty easy too!',
 'title': 'MongoDB is fun'}
```

Just like we did with [find_one()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find_one), we can pass a document to [find()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find) to limit the returned results. Here, we get only those documents whose author is “Mike”:

```
for post in posts.find({"author": "Mike"}):
    pprint.pprint(post)

{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['mongodb', 'python', 'pymongo'],
 'text': 'My first blog post!'}
{'_id': ObjectId('...'),
 'author': 'Mike',
 'date': datetime.datetime(...),
 'tags': ['bulk', 'insert'],
 'text': 'Another post!'}
``````

# Counting

If we just want to know how many documents match a query we can perform a [count_documents()](https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.count_documents) operation instead of a full query. We can get a count of all of the documents in a collection:

```
posts.count_documents({})
3
```

or just of those documents that match a specific query:

```
posts.count_documents({"author": "Mike"})
2
```

# Links

* [PyMongo Documentation Homepage](https://pymongo.readthedocs.io/en/stable/)
* [PyMongo Docs from w3schools](https://www.w3schools.com/python/python_mongodb_query.asp)
