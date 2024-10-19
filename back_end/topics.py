class TopicManager:
    def __init__(self):
        # List of pre-specified topics
        self.topics = [
            "DataFrame",
            "NMI (Normalised Mutual Information)",
            "Sentence splitting using nltk (ensure punkt and stopwords are downloaded)",
            "Correlation",
            "Linear Regression",
            "Decision Tree Classifier",
            "Reading/Writing CSV files (read should not take in actual csv file just simulate the process)"
        ]
        # List of pre-specified contexts (themes for code)
        self.contexts = ["Koala", "Penguin", "Zebra", "Donkey", "Rabbit", "Cat"]