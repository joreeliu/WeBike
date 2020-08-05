import os
SECRET_KEY = os.urandom(32)
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

# Connect to the database


# TODO IMPLEMENT DATABASE URL
#SQLALCHEMY_DATABASE_URI = 'postgres://postgres:wlo2283630@localhost:5432/BikeShare'
#SQLALCHEMY_DATABASE_URI = 'postgres://ydhhpdaikjfqol:54a0791dd059621a63dddc9d594c5ab8c75991633f1ba66d8db5744195b35112@ec2-54-159-138-67.compute-1.amazonaws.com:5432/dfp7povedb2pfd'
SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
#  https://webike-joree.herokuapp.com/