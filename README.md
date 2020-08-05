# URL
## Front End
https://webike-frontend.herokuapp.com
## Back End
https://webike-joree.herokuapp.com
## Auth
In local storage, set

For Manager:

JWTS_LOCAL_KEY =  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il84Y0pmZWdIR2ozbHRRam1hN3ktbSJ9.eyJpc3MiOiJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTQwMDE2MDg5OTYzOTE3NjMzNSIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1OTY1MDQyMjgsImV4cCI6MTU5NjUxMTQyOCwiYXpwIjoidDgyNkUyYWdQelpvSzhxbHJKZHR5eWY0T3kyNjBXYm4iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiZ2V0OmFwYXJ0bWVudHMiLCJnZXQ6YmlrZXMiLCJwb3N0OmFwYXJ0bWVudCIsInBvc3Q6YmlrZXMiLCJwb3N0OmJvb2tiaWtlcyJdfQ.mF7QwgFps9Xu0zKqUJcGxXPG-sNuCxLOzoSkHyk2yAh85RFNcC97R1SI-NROBeV2CTPUs6Fvj2b-wIDIqXy-XwJgsdXh98e7-p3gqyxWJcmPm0lz6bSLHKqBNeYjv8gFEMZ6VBTY7s2G_UsiirMXJIp5vnB7aR7kmMBmyPNm0tAWiQYb8vSXfZowtqhlz9B223-l9Jagwlrzlap9MB7B2GzAn9pnfX1kJXhPcxdKSQHgSUPl1IQsUCZUkVofzupSudHvjOojrZAcX7EwXfFM4Onc_Js5IvGLPsUpDU3JufrIxNCHctqgv1BvcvvH0W0uCpnA1qJ0tTrXdhP130ztPg

For customer:

JWTS_LOCAL_KEY = eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il84Y0pmZWdIR2ozbHRRam1hN3ktbSJ9.eyJpc3MiOiJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDgzNTc2NjcyNDc1MzQ3MDM0MiIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1OTY1MDY1MzMsImV4cCI6MTU5NjUxMzczMywiYXpwIjoidDgyNkUyYWdQelpvSzhxbHJKZHR5eWY0T3kyNjBXYm4iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiZ2V0OmFwYXJ0bWVudHMiLCJnZXQ6YmlrZXMiLCJwb3N0OmJvb2tiaWtlcyJdfQ.SMK7XmHDtCjLmhgV-IYFu0B27dyhvVEDDGEQqKXY1WTJVethw2NZz3N4C87ofLJMn0j6jybvc9ApoXLDi81uuJS8JA3Z9d2MA9z5vCyVBiBhT640C6NrOCYKXOe-F81CLridmeAfas3Dbd8-7_dd5uR9MNkalflPzP9rmpG6B1JOjy70OLEH6cgEswGFEoUjZJDtCqo5brfiWvxfIJ3EY0KbdMWC0XD2oGG4BBWnr3CnN9eXgLVVAEigC2fkgXCLBCUwCoKfR_uvHoPjgPRIuYgUJPVrkbsxiR8Wfxh_-RsVoAlmKsv9u3C1r8efUGCY2IrY7cvzoQb3t-zKlaQlDw


## Motivation

This application is a bike share platform. User can find nearby apartment buildings, and book bikes associated with one building.

## Hosting Instructions
the backend flask should be launched with db connection in config.py. We have the flask db migration to set up the schema.

the front end is an angular application, the environment file is used to set the backend connection.

## Deploy
git remote add heroku ...
git push heroku master

## RBAC Controls
We have two roles: customer and manager.
Customer can view the apartment, view bikes, book reservation, view reservation.
In addition to the rights Customer have, Manager can edit, delete apartments and bikes.

## EndPoint
- Get '/apartments'
- Get '/apartments/\<int:apartment_id\>/<start_time>/<end_time>/bikes'
- Get '/getApartment/\<int:id\>'
- Get '/getBike/\<int:bike_id\>'
- Get '/myreservations'
- Delete '/bikes/delete/\<int:bike_id\>'
- Delete '/apartments/delete/\<int:apartment_id\>'
- Post '/addApartment'
- Post '/bookBikes'
- Post '/addBikes'


Get '/apartments'
- get all apartments available
- Returns:
```json
[
  {
    "address": "25 Senate Pl, Jersey City, NJ 07306", 
    "bikes_for_rent": [
      5
    ], 
    "id": 18, 
    "name": "25 Senate Place", 
    "num_bike_for_rent": 1, 
    "picture": "https://images1.apartments.com/i2/mJeB_1kruLCTiaw8EOzUjSKjjyMkwEjO4bm8FH41_UQ/117/25-senate-place-jersey-city-nj-2-bedroom-duplex-loft.jpg", 
    "total_bikes": 1
  }, 
  {
    "address": "444 Washington Blvd, Jersey City, NJ 07310", 
    "bikes_for_rent": [], 
    "id": 19, 
    "name": "Avalon Cove", 
    "num_bike_for_rent": 0, 
    "picture": "https://images1.apartments.com/i2/atKYP-dWjwD2tnwktWtfr_bn_N1QikH-E0vCL6jluyo/117/avalon-cove-jersey-city-nj-living-room.jpg", 
    "total_bikes": 2
  }
]
```

Get '/apartments/\<int:apartment_id\>/<start_time>/<end_time>/bikes'
- get all bikes inside one apartment available in a time period
- Request Arguments: apartment_id, start_time, end_time
-Returns:
```json
[
  {
    "availibility": true, 
    "description": "This is really good because of the durability and how smooth it is through the woods", 
    "id": 6, 
    "name": "FUJI NEVADA 27.5 1.9", 
    "picture": "https://www.sefiles.net/images/library/large/fuji-nevada-27.5-1.9-347814-13.jpg"
  }
]

```

Get '/getApartment/\<int:id\>'
- Get Apartment by id
- Request Arguments: apartment_id
- Returns:
```json
{
    "address": "444 Washington Blvd, Jersey City, NJ 07310", 
    "bikes_for_rent": [], 
    "id": 19, 
    "name": "Avalon Cove", 
    "num_bike_for_rent": 0, 
    "picture": "https://images1.apartments.com/i2/atKYP-dWjwD2tnwktWtfr_bn_N1QikH-E0vCL6jluyo/117/avalon-cove-jersey-city-nj-living-room.jpg", 
    "total_bikes": 2
  }
```

Get '/getBike/\<int:bike_id\>'
- Get Bike by id
- Request Arguments: bike_id
- Returns:
```json
 {
    "availibility": true, 
    "description": "This is really good because of the durability and how smooth it is through the woods", 
    "id": 6, 
    "name": "FUJI NEVADA 27.5 1.9", 
    "picture": "https://www.sefiles.net/images/library/large/fuji-nevada-27.5-1.9-347814-13.jpg"
  }
```

Delete '/bikes/delete/\<int:bike_id\>'
- Delete bike by id
- Request Arguments: bike_id
- Returns:
```json
{"success": True}
```

Delete '/apartments/delete/\<int:apartment_id\>'
- Delete apartment by id
- Request Arguments: apartment_id
- Returns:
```json
{"success": True}
```

Post '/addApartment'
- addApartment
- Request Arguments:
```json
{name: "test", address: "test", picture: "test"}
```
- Returns:
```json
{"success": True}
```

Post '/bookBikes'
- book bikes
- Request Arguments:
```json
{bike_id: 6, start: "2020-08-31 08:14:59", end: "2020-08-31 21:14:59"}
```
- Returns:
```json
{"success": True}
```

Post '/addBikes'
- add bikes
- Request Arguments:
```json
{name: "test", description: "test", picture: "test"}
```
- Returns:
```json
{"success": True}
```

Get '/myreservations'
- Get all reservations booked
- Returns:
```json
[
  {
    "apartment": "Avalon Cove", 
    "bike_id": 6, 
    "bike_name": "FUJI NEVADA 27.5 1.9", 
    "customer_id": 1, 
    "end": "2020-07-31 22:47:17", 
    "picture": "https://www.sefiles.net/images/library/large/fuji-nevada-27.5-1.9-347814-13.jpg", 
    "start": "2020-07-31 22:47:17"
  }, 
  {
    "apartment": "Avalon Cove", 
    "bike_id": 6, 
    "bike_name": "FUJI NEVADA 27.5 1.9", 
    "customer_id": 1, 
    "end": "2020-08-31 21:14:59", 
    "picture": "https://www.sefiles.net/images/library/large/fuji-nevada-27.5-1.9-347814-13.jpg", 
    "start": "2020-08-31 08:14:59"
  }
]

```


