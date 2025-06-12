---
title: Python BTrees
layout: default
---

# Introduction and Scope

This page provides a collection of links to BTree related documation as well as containing useful code snippets.

# Creating a TreeSet

```
from BTrees.OOBTree import TreeSet
t = TreeSet()
```

# Inserting items and displaying the TreeSet contents
```
from BTrees.OOBTree import TreeSet
t = TreeSet()

(a, b, c, d, e) = ('aardvark', 'beaver', 'cow', 'dog', 'elephant')
t.insert(a)
t.insert(b)
t.insert(c)
t.insert(d)
t.insert(e)

for elem in t.keys():
  print(f"{elem}")
```

# Adding multiple objects into a TreeSet 
```
from BTrees.OOBTree import TreeSet
t = TreeSet()
t.update({'cow', 'beaver', 'elephant', 'dog', 'aardvark'})

for elem in t.keys():
  print(f"{elem}")

```
# Check the TreeSet contains an element
```
from BTrees.OOBTree import TreeSet
t = TreeSet()
t.update({'cow', 'beaver', 'elephant', 'dog', 'aardvark'})

if t.has_key('cow'):
  print(f"The tree contains a cow!")

if not t.has_key('zero'):
  print("The tree does not contain a zero!")
```

# Removing an item from a TreeSet
```
from BTrees.OOBTree import TreeSet
t = TreeSet()
t.update({'giraffe', 'cow', 'beaver', 'elephant', 'dog', 'aardvark'})

print("TreeSet after:")
for elem in t.keys():
  print(f"{elem}")

t.remove('giraffe')

print("TreeSet after:")
for elem in t.keys():
  print(f"{elem}")
```
# Storing objects as values in a TreeSet
```
from BTrees.OOBTree import TreeSet

class Person():
  def __init__(self, age):
    self._age = age
  def age(self, age=None):
    if age:
      self._age = age
    return self._age
  def __lt__(self, other):
    return self.age() < other.age()
  def __le__(self, other):
    return self.age() <= other.age()
  def __eq__(self, other):
    return self.age() == other.age()
  def __ne__(self, other):
    return self.age() != other.age()
  def __hash__(self):
    return hash(self.age())
  def __str__(self):
    return f"Person with age: {self.age()}"

Bob = Person(54)
Jane = Person(65)
Henry = Person(65)
Sally = Person(2)

t = TreeSet()
t.update({Bob, Jane, Henry, Sally})

for elem in t.keys():
  print(f"{elem}")
```
# Making sure your hash value is unique

```
from BTrees.OOBTree import TreeSet
import persistent

class Person(persistent.Persistent):
  def __init__(self, age, name):
    self.age = age
    self.name = name
  def __lt__(self, other):
    if self.age < other.age:
      return True
    elif self.age == other.age and self.name < other.name:
      return True
    else:
      return False
  def __le__(self, other):
    if self.age < other.age:
      return True
    elif self.age == other.age and self.name <= other.name:
      return True
    else:
      return False
  def __eq__(self, other):
    return (self.age, self.name) == (other.age, other.name)
  def __ne__(self, other):
    return not (self == other)
  def __hash__(self):
    return hash((self.age, self.name))
  def __str__(self):
    return f"{self.name} ({self.age})"

Bob = Person(54, 'Bob')
Jane = Person(65, 'Jane')
Sally = Person(2, 'Sally')
Junior = Person(2, 'Junior')

t = TreeSet()
t.update({Bob, Jane, Sally, Junior})

for elem in t.keys():
  print(f"{elem}")
```
# Links

* [Official BTrees Documenation](https://pythonhosted.org/BTrees/)
* [BTrees APIs, methods and more](https://btrees.readthedocs.io/en/stable/api.html)
