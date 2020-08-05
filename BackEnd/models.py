from flask_sqlalchemy import SQLAlchemy
from config import SQLALCHEMY_DATABASE_URI
db = SQLAlchemy()

# ----------------------------------------------------------------------------#
# Models.
# ----------------------------------------------------------------------------#


class Apartment(db.Model):
    __tablename__ = 'apartment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))
    address = db.Column(db.String(120))
    picture = db.Column(db.String(500))

class Bike(db.Model):
    __tablename__ = 'bike'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))
    picture = db.Column(db.String(500))
    apartment_id = db.Column(db.Integer, db.ForeignKey('apartment.id'), nullable=False)
    description = db.Column(db.String(200))


class Reservation(db.Model):
    __tablename__ = 'reservation'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    bike_id = db.Column(db.Integer, db.ForeignKey('bike.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    start = db.Column(db.DateTime)
    end = db.Column(db.DateTime)

class Customer(db.Model):
    __tablename__ = 'customer'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))



