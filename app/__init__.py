
from flask import Flask

# initalize app
app = Flask(__name__, instance_relative_config=True)

# load views
from app import views

app.config.from_object('config')