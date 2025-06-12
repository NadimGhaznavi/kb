---
title: Simplistic Decorator Pattern in Python
layout: default
---

Consider a data engineering project scenario with a basic data pipeline responsible for extracting, transforming, and loading (ETL) operations. Over time, the need arises to add logging, error handling, and data validation steps without disrupting the existing pipeline structure.

```
class BasicPipeline:
    def execute(self, data):
        # Extract, Transform, Load
        pass

class PipelineDecorator:
    def __init__(self, pipeline):
        self._pipeline = pipeline

    def execute(self, data):
        self._pipeline.execute(data)

class LoggerDecorator(PipelineDecorator):
    def execute(self, data):
        print("Logging data flow...")
        super().execute(data)

class ErrorHandlerDecorator(PipelineDecorator):
    def execute(self, data):
        try:
            super().execute(data)
        except Exception as e:
            print(f"Error: {e}")

class DataValidatorDecorator(PipelineDecorator):
    def execute(self, data):
        if data_is_valid(data):  # Assuming data_is_valid is a predefined function
            super().execute(data)
        else:
            print("Invalid data")

# Usage:
basic_pipeline = BasicPipeline()
enhanced_pipeline = DataValidatorDecorator(ErrorHandlerDecorator(LoggerDecorator(basic_pipeline)))
enhanced_pipeline.execute(data)  # data is the dataset to be processed
```
While I was employed at a company focused on data, we were tasked with improving our ETL pipelines to include real-time data validation, error handling, and logging. The traditional approach would have required a complete overhaul of our current classes, which would have been a lengthy process given the project’s scale.

However, after researching design patterns, I discovered we needed the Decorator Pattern solution. We created decorator classes for each new functionality, expanding our base pipeline class. This allowed us to enhance our data pipeline and modularly gradually.

- From [Harnessing Python Design Patterns for Machine Learning: A Dive Into Five Paradigms](https://medium.com/@rafalb/harnessing-python-design-patterns-for-machine-learning-a-dive-into-five-paradigms-c696d4970a37)