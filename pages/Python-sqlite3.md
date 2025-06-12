---
title: Python sqlite3
layout: default
---

# Introduction and Scope

SQLite is a C library that provides a lightweight disk-based database that doesn’t require a separate server process and allows accessing the database using a nonstandard variant of the SQL query language. The backend of SQLite is file based.

This page documents basic operations and features of the Python sqlite3 library including [cursors](https://en.wikipedia.org/wiki/Cursor_(databases)) and [transactions](https://en.wikipedia.org/wiki/Database_transaction).

The information on this page is taken, verbatim, from the *excellent* standard Python documenation on [sqlite3](https://docs.python.org/3/library/sqlite3.html).

# Creating a Database

To create a connection to the database tutorial.db in the current working directory, implicitly creating it if it does not exist:
```
import sqlite3
con  = sqlite3.connect('tutorial.db')
```
The returned [Connection](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection) object con represents the connection to the on-disk database.

In order to execute SQL statements and fetch results from SQL queries, we will need to use a database cursor. Call [con.cursor()](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.cursor) to create the [Cursor](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor):
```
cur = con.cursor()
```
Now that we’ve got a database connection and a cursor, we can create a database table movie with columns for title, release year, and review score. For simplicity, we can just use column names in the table declaration – thanks to the [flexible typing](https://www.sqlite.org/flextypegood.html) feature of SQLite, specifying the data types is optional. Execute the CREATE TABLE statement by calling [cur.execute(...)](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.execute):
```
cur.execute("CREATE TABLE movie(title, year, score)")
```
We can verify that the new table has been created by querying the sqlite_master table built-in to SQLite, which should now contain an entry for the movie table definition (see [The Schema Table](https://www.sqlite.org/schematab.html) for details). Execute that query by calling [cur.execute(...)](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.execute), assign the result to res, and call [res.fetchone()](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.fetchone) to fetch the resulting row:
```
>>> res = cur.execute("SELECT name FROM sqlite_master")
>>> res.fetchone()
('movie',)
```
We can see that the table has been created, as the query returns a [tuple](https://docs.python.org/3/library/stdtypes.html#tuple) containing the table’s name. If we query sqlite_master for a non-existent table spam, res.fetchone() will return None:
```
>>> res = cur.execute("SELECT name FROM sqlite_master WHERE name='spam'")
>>> res.fetchone() is None
True
```
Now, add two rows of data supplied as SQL literals by executing an INSERT statement, once again by calling [cur.execute(...)](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.execute):
```
cur.execute("""
    INSERT INTO movie VALUES
        ('Monty Python and the Holy Grail', 1975, 8.2),
        ('And Now for Something Completely Different', 1971, 7.5)
""")
```
The INSERT statement implicitly opens a transaction, which needs to be committed before changes are saved in the database (see [Transaction control](https://docs.python.org/3/library/sqlite3.html#sqlite3-controlling-transactions) for details). Call [con.commit()](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.commit) on the connection object to commit the transaction:
```
con.commit()
```
We can verify that the data was inserted correctly by executing a SELECT query. Use the now-familiar [cur.execute(...)](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.execute) to assign the result to res, and call [res.fetchall()](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.fetchall) to return all resulting rows:
```
>>> res = cur.execute("SELECT score FROM movie")
>>> res.fetchall()
[(8.2,), (7.5,)]
```
The result is a [list](https://docs.python.org/3/library/stdtypes.html#list) of two tuples, one per row, each containing that row’s score value.

Now, insert three more rows by calling [cur.executemany(...)](https://docs.python.org/3/library/sqlite3.html#sqlite3.Cursor.executemany):
```
data = [
    ("Monty Python Live at the Hollywood Bowl", 1982, 7.9),
    ("Monty Python's The Meaning of Life", 1983, 7.5),
    ("Monty Python's Life of Brian", 1979, 8.0),
]
cur.executemany("INSERT INTO movie VALUES(?, ?, ?)", data)
con.commit()  # Remember to commit the transaction after executing INSERT.
```
Notice that ? placeholders are used to bind data to the query. Always use placeholders instead of [string formatting](https://docs.python.org/3/tutorial/inputoutput.html#tut-formatting) to bind Python values to SQL statements, to avoid [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection) (see [How to use placeholders to bind values in SQL queries](https://docs.python.org/3/library/sqlite3.html#sqlite3-placeholders) for more details).

We can verify that the new rows were inserted by executing a SELECT query, this time iterating over the results of the query:
```
>>> for row in cur.execute("SELECT year, title FROM movie ORDER BY year"):
... print(row)
(1971, 'And Now for Something Completely Different')
(1975, 'Monty Python and the Holy Grail')
(1979, "Monty Python's Life of Brian")
(1982, 'Monty Python Live at the Hollywood Bowl')
(1983, "Monty Python's The Meaning of Life")
```
Finally, verify that the database has been written to disk by calling [con.close()](https://docs.python.org/3/library/sqlite3.html#sqlite3.Connection.close) to close the existing connection, opening a new one, creating a new cursor, then querying the database:
```
>>> con.close()
>>> new_con = sqlite3.connect("tutorial.db")
>>> new_cur = new_con.cursor()
>>> res = new_cur.execute("SELECT title, year FROM movie ORDER BY score DESC")
>>> title, year = res.fetchone()
>>> print(f'The highest scoring Monty Python movie is {title!r}, released in {year}')
The highest scoring Monty Python movie is 'Monty Python and the Holy Grail', released in 1975
>>> new_con.close()
```
You’ve now created an SQLite database using the sqlite3 module, inserted data and retrieved values from it in multiple ways.


# Links

* Python [sqlite3 Documentation](https://docs.python.org/3/library/sqlite3.html) 
* Python [sqlite3 Tutorial](https://docs.python.org/3/library/sqlite3.html#tutorial)
* Python [sqlite3 Module Reference](https://docs.python.org/3/library/sqlite3.html#reference)