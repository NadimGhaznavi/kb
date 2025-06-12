---
title: Simplistic Factory Pattern in Python
layout: default
---

In this snippet, ModelFactory is our factory class that creates different machine-learning models based on the input model_type. This way, the code calling the factory doesn’t need to know about the specific model classes, making it more readable and extendable.

The real-life analogy of this pattern can be likened to a card factory. A card factory can produce birthdays, anniversaries, or any card you need. Similarly, our ModelFactory can generate various machine-learning models as required. The abstraction of creation logic allowed us to easily integrate new machine-learning models into our system as the project evolved.

```
class ModelFactory:
    def create_model(model_type):
        if model_type == 'logistic_regression':
            return LogisticRegression()
        elif model_type == 'decision_tree':
            return DecisionTreeClassifier()
        elif model_type == 'svm':
            return SVC()
        else:
            raise ValueError(f'Model type {model_type} not recognized.')

class LogisticRegression:
    def train(self, data):
        print("Training Logistic Regression on data...")

class DecisionTreeClassifier:
    def train(self, data):
        print("Training Decision Tree on data...")

class SVC:
    def train(self, data):
        print("Training SVM on data...")

# Usage:
model_type = 'svm'
model_factory = ModelFactory()
model = model_factory.create_model(model_type)
model.train(data)
```
-From [Harnessing Python Design Patterns for Machine Learning: A Dive Into Five Paradigms](https://medium.com/@rafalb/harnessing-python-design-patterns-for-machine-learning-a-dive-into-five-paradigms-c696d4970a37)