---
title: Model View Controller Pattern in Python
layout: default
---

# Introduction and Scope

The contents of this page are taken, verbatim, from an article [Hands-On Guide to Model-View-Controller (MVC) Architecture in Python](https://medium.com/@owuordove/hands-on-guide-to-model-view-controller-mvc-architecture-in-python-ec81b2b9330d) by [Dovine K.](https://medium.com/@owuordove/about). It provides a clear explanation of the *Model, View, Controller* design pattern and provides an example in Python.

Building scalable and maintainable software requires a robust architectural pattern, and Model-View-Controller (MVC) stands out as a timeless choice. In this hands-on guide, we’ll explore the MVC architecture in Python, unraveling its principles and demonstrating how to implement a simple MVC pattern in your projects.

# Understanding MVC Architecture

**What is MVC in Software Design?**

MVC, which stands for Model-View-Controller, is a powerful software design pattern that effectively divides an application into three interconnected components. 

## Model
* Represents the data and busienss logic of the application.
* Manages the data, responds to queries, and updates the Controller about any changes.

## View
* Presents the data to the user and handles user interface interactions.
* Receives input from users and sends it to the Controller for processing.

## Controller
* Acts as an intermediary between the **Model** and **View**.
* Receives user input from the **View**, processes it (updates the **Model** if necessary) and updates the **View**.

The separation of concerns provided by MVC promotes modularity, making it easier to develop, test and maintain software.

# Implementing MVC in Python

Let's create a simple Python application to manage a list of tasks using the MVC architecture.

## Step 1: Define the Model
```
# model.py
class TaskModel:
    def __init__(self):
        self.tasks = []
    def add_task(self, task):
        self.tasks.append(task)
    def get_tasks(self):
        return self.tasks
```

## Step 2: Implement the View
```
# view.py
class TaskView:
    def display_tasks(self, tasks):
        print("Tasks:")
        for task in tasks:
            print(f"- {task}")
```

## Step 3: Create the Controller
```
# controller.py
from model import TaskModel
from view import TaskView
class TaskController:
    def __init__(self, model, view):
        self.model = model
        self.view = view
    def add_task(self, task):
        self.model.add_task(task)
        self.update_view()
    def update_view(self):
        tasks = self.model.get_tasks()
        self.view.display_tasks(tasks)
```

## Step 4: Putting it All Together
```
# main.py
from model import TaskModel
from view import TaskView
from controller import TaskController
# Create instances of Model, View, and Controller
model = TaskModel()
view = TaskView()
controller = TaskController(model, view)
# Add tasks using the Controller
controller.add_task("Complete assignment")
controller.add_task("Prepare presentation")
```

Run `main.py`, and you'll see the tasks displayed in the console. This simple example illustrates the MVC architecture in action.

# Key Takeaways

## Separation of Concerns
* The **Model** encapsulates data and logic.
* The **View** handles the presentation and user interface.
* The **Controller** manages user input and updates the **Model** and **View** accordingly.

## Modularity and Testability
Each component (**Model**, **View** and **Controller**) can be developed and tested independently.

## Flexibility and Maintainability
Changes to one component have minimal impact on the others.

## Scalability
This pattern is suitable for both small and large applications.

# Conclusion
Mastering the **Model-View-Controller** architecture in Python opens the door to creating scalable, maintainable and organized software. By understanding the roles of the Model, View and Controller components, you can apply MVC principles to diverse projects, from simple task management applications to complex web applications. Dive into MVC, enhance your software development skills and embrace a pattern that has withstood the test of time. Happy Coding!

# Links

* [Hands-On Guide to Model-View-Controller (MVC) Architecture in Python](https://medium.com/@owuordove/hands-on-guide-to-model-view-controller-mvc-architecture-in-python-ec81b2b9330d) by [Dovine K.](https://medium.com/@owuordove/about)