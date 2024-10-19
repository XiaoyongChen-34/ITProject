import sklearn
import pandas as pd
import numpy as np
import nltk
import robot
import json
import csv
import bs4  # beautifulsoup4
import requests
import urllib
import unicodedata
import matplotlib
import collections
import typing
import os


# List of Python libraries used in EODP 
class Library:
    def __init__(self):
        self.libraries = [
            "sklearn",
            "pandas",
            "numpy",
            "nltk",
            "robot",
            "json",
            "csv",
            "bs4",  
            "requests",
            "urllib",
            "unicodedata",
            "matplotlib",
            "collections",
            "typing",
            "knn",  
            "os",
            "featureselection" 
        ]

    # Create a global context dictionary mapping the library names to their imported modules
        self.global_context = {
            'sklearn': sklearn,
            'pandas': pd,
            'numpy': np,
            'nltk': nltk,
            'robot': robot,
            'json': json,
            'csv': csv,
            'bs4': bs4,
            'requests': requests,
            'urllib': urllib,
            'unicodedata': unicodedata,
            'matplotlib': matplotlib,
            'collections': collections,
            'typing': typing,
            'os': os
        }

    def get_global_context(self):
        """Return the global context dictionary."""
        return self.global_context

    def get_libraries(self):
        """Return the list of libraries."""
        return self.libraries

    def format_libraries_for_prompt(self):
        """Return a formatted string of libraries for display or prompts."""
        return "\n".join(f"- {lib}" for lib in self.libraries)