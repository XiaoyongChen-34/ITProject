from flask import Flask
from routing import RoutingService

import nltk
with open('nltk.txt', 'r') as file:
    for resource in file.readlines():
        nltk.download(resource.strip())

app = Flask(__name__)

# Instantiate the RoutingService with the Flask app
routing_service = RoutingService(app)

if __name__ == '__main__':
    from waitress import serve
    serve(app, host="127.0.0.1", port=8080)
    #app.run(debug=True)

#Update

