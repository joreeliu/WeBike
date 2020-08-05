# ----------------------------------------------------------------------------#
# Imports
# ----------------------------------------------------------------------------#

import json
import dateutil.parser
import babel
from flask import Flask, render_template, request, Response, flash, redirect, url_for, jsonify, abort
from flask_moment import Moment
from flask_sqlalchemy import SQLAlchemy
import logging
from logging import Formatter, FileHandler
from flask_wtf import Form
#from forms import *
from flask_migrate import Migrate
from sqlalchemy.orm import relationship
from sqlalchemy import func
from flask_wtf import CsrfProtect
from models import *
from flask_cors import CORS
from auth.auth import AuthError, requires_auth, verify_decode_jwt
import dateutil.parser
from datetime import datetime
from sqlalchemy import desc


# ----------------------------------------------------------------------------#
# App Config.
# ----------------------------------------------------------------------------#

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
moment = Moment(app)
app.config.from_object('config')

db.init_app(app)
migrate = Migrate(app, db)

# ----------------------------------------------------------------------------#
# Filters.
# ----------------------------------------------------------------------------#

def format_datetime(value, format='medium'):
    date = dateutil.parser.parse(value)
    if format == 'full':
        format = "EEEE MMMM, d, y 'at' h:mma"
    elif format == 'medium':
        format = "EE MM, dd, y h:mma"
    return babel.dates.format_datetime(date, format)


app.jinja_env.filters['datetime'] = format_datetime


# ----------------------------------------------------------------------------#
# Controllers.
# ----------------------------------------------------------------------------#

@app.route('/')
def index():
    return render_template('home.html')


# ----------------------------------------------------------------------------#
# Apartments
# ----------------------------------------------------------------------------#
@app.route('/apartments')
@requires_auth("get:apartments")
def apartments(jwt):
    ## get apartments with name, address, picture, number of bikes can rent and their IDs
    # '''
    # data = [{
    # "name": "Manhattan Park",
    # "address": "30 River Rd, New York, NY 10044",
    # "picture": "https://cdn-img-feed.streeteasy.com/nyc/image/36/366939736.jpg",
    # "total_bikes": 5,
    # "num_bikes_for_rent": 2,
    # "bikes_for_rent":[1,2]
    # }]
    # '''
    token = request.headers.environ['HTTP_AUTHORIZATION'].split()[1]
    user = verify_decode_jwt(token)['sub']
    res = db.session.query(Customer).filter(Customer.name == user).all()
    if not res:
        tmp_customer = Customer(name=user)
        db.session.add(tmp_customer)
        db.session.commit()

    apartment_res = db.session.query(Apartment).all()
    all_apartments = []

    for a in apartment_res:
        apartment = {}
        bike_query = db.session.query(Bike, Reservation).join(Reservation, isouter=True).filter(Bike.apartment_id == a.id)
        bike_res = bike_query.all()
        total_bikes = len(bike_res)
        apartment['id'] = a.id
        apartment['name'] = a.name
        apartment['address'] = a.address
        apartment['picture'] = a.picture
        apartment['total_bikes'] = total_bikes
        bikes_for_rent = []
        for bike, reservation in bike_res:
            if not reservation:
                bikes_for_rent.append(bike.id)
        apartment['num_bike_for_rent'] = len(bikes_for_rent)
        apartment['bikes_for_rent'] = bikes_for_rent
        all_apartments.append(apartment)

    return jsonify(all_apartments)


# ----------------------------------------------------------------------------#
# Bike
# ----------------------------------------------------------------------------#
@app.route('/apartments/<int:apartment_id>/<start_time>/<end_time>/bikes', methods=['GET'])
@requires_auth("get:bikes")
def get_bikes_by_apartment(jwt, apartment_id, start_time, end_time):
    res = db.session.query(Bike, Apartment).join(Apartment, isouter=True).join(Reservation, isouter=True).filter(Apartment.id==apartment_id)
    bikes = []
    format = "%Y-%m-%d %H:%M:%S"
    start = datetime.strptime(start_time, format)
    end = datetime.strptime(end_time, format)
    for b, apt in res:
        bike = {}
        bike['id'] = b.id
        bike['name'] = b.name
        bike['description'] = b.description
        bike['picture'] = b.picture
        bike['description'] = b.description
        bike['availibility'] = True

        bikes.append(bike)

    for i in range(len(bikes)):
        bike = bikes[i]
        res = db.session.query(Bike, Reservation).join(Reservation, isouter=True).filter(Bike.id == bike['id'])
        for bike, resv in res:
            if resv:
                if start >= resv.start.replace(microsecond=0) and start <= resv.end.replace(microsecond=0):
                    bikes[i]['availibility'] = False
                elif end >= resv.start.replace(microsecond=0) and end <= resv.end.replace(microsecond=0) <= end:
                    bikes[i]['availibility'] = False

    return jsonify(bikes)


@app.route('/getApartment/<int:id>')
@requires_auth("get:apartments")
def get_apartment(jwt, id):
    try:
        a = db.session.query(Apartment).filter(Apartment.id == id).first()
    except Exception as e:
        logging.error(e)
        abort(400)

    apartment = {}
    apartment['id'] = a.id
    apartment['name'] = a.name
    apartment['address'] = a.address
    apartment['picture'] = a.picture
    return jsonify(apartment), 200


@app.route('/getBike/<int:bike_id>')
@requires_auth("get:apartments")
def get_bike(jwt, bike_id):
    try:
        b = db.session.query(Bike).filter(Bike.id == bike_id).first()
        if not b:
            abort(404)
    except Exception as e:
        logging.error(e)
        abort(400)

    bike = {}
    bike['id'] = b.id
    bike['name'] = b.name
    bike['description'] = b.description
    bike['picture'] = b.picture
    return jsonify(bike), 200


@app.route('/bikes/delete/<int:bike_id>', methods=['DELETE'])
@requires_auth("post:bikes")
def delete_bike(jwt, bike_id):
    try:
        b = db.session.query(Bike).filter(Bike.id == bike_id)
    except Exception as e:
        logging.error(e)
        abort(404)
    try:
        b.delete()
        db.session.commit()
    except Exception as e:
        logging.error(e)
        abort(500)
    return jsonify({"success": True}), 200


@app.route('/apartments/delete/<int:apartment_id>', methods=['DELETE'])
@requires_auth("post:apartment")
def delete_apartment(jwt, apartment_id):
    try:
        b = db.session.query(Apartment).filter(Apartment.id == apartment_id)
    except Exception as e:
        logging.error(e)
        abort(404)
    try:
        b.delete()
        db.session.commit()
    except Exception as e:
        logging.error(e)
        abort(500)
    return jsonify({"success": True}), 200


@app.route('/addApartment', methods=['POST'])
@requires_auth("post:apartment")
def add_apartment(jwt):
    data = request.get_json()
    name = data['name']
    address = data['address']
    picture = data['picture']
    if 'id' in data:
        apartment = db.session.query(Apartment).filter(Apartment.id == data['id']).first()
        apartment.name = name
        apartment.address = address
        apartment.picture = picture
    else:
        apartment = Apartment(name=name, address=address, picture=picture)

    try:
        db.session.add(apartment)
        db.session.commit()
    except Exception as e:
        abort(500)
    return jsonify({"success": True}), 200


@app.route('/bookBikes', methods=['POST'])
@requires_auth("post:bookbikes")
def book_reservation(jwt):
    data = request.get_json()
    token = request.headers.environ['HTTP_AUTHORIZATION'].split()[1]
    user = verify_decode_jwt(token)['sub']
    customer = db.session.query(Customer).filter(Customer.name == user).first()
    format = "%Y-%m-%d %H:%M:%S"
    start_date = datetime.strptime(data['start'], format)
    end_date = datetime.strptime(data['end'], format)

    reserve = Reservation(customer_id=customer.id, bike_id=data['bike_id'], start=start_date, end=end_date)
    db.session.add(reserve)
    db.session.commit()
    return jsonify({"success": True}), 200


@app.route('/addBikes', methods=['POST'])
@requires_auth("post:bikes")
def add_bike(jwt):
    data = request.get_json()
    name = data['name']
    description = data['description']
    picture = data['picture']
    apartment_id = data['apartment_id']
    if 'id' in data:
        bike = db.session.query(Bike).filter(Bike.id == data['id']).first()
        bike.name = name
        bike.description = description
        bike.picture = picture
        bike.apartment_id = apartment_id
    else:
        bike = Bike(name=name, description=description, picture=picture, apartment_id=apartment_id)
    db.session.add(bike)
    db.session.commit()
    return jsonify({"success": True}), 200


@app.route('/myreservations', methods=['GET'])
def get_my_reservation():
    token = request.headers.environ['HTTP_AUTHORIZATION'].split()[1]
    user = verify_decode_jwt(token)['sub']
    customer = db.session.query(Customer).filter(Customer.name == user).first()
    Reservations = db.session.query(Bike, Reservation).join(Bike).join(Apartment).filter(Reservation.customer_id == customer.id).all()

    res = []

    for b, r in Reservations:
        a = db.session.query(Apartment).filter(Apartment.id == b.apartment_id).first()
        res.append(dict(bike_id=r.bike_id, bike_name=b.name, picture=b.picture, apartment=a.name, customer_id=r.customer_id, start=str(r.start), end=str(r.end)))

    return jsonify(res), 200


@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
                    "success": False,
                    "error": 404,
                    "message": "resource not found"
                    }), 404

'''
@TODO implement error handler for AuthError
    error handler should conform to general task above 
'''


@app.errorhandler(401)
def auth_error(error):
    return jsonify({
        'success': False,
        'error': 401,
        'message': 'Not authorized'
    }), 401


@app.errorhandler(400)
def page_not_found(e):
    return jsonify({
        'success': False,
        'data': 'Bad Request'
    }), 400






# ----------------------------------------------------------------------------#
# Launch.
# ----------------------------------------------------------------------------#

# Default port:
if __name__ == '__main__':
    app.run()
