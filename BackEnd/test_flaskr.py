import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from app import app


class bikeShareTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = app
        self.client = self.app.test_client
        self.manager = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il84Y0pmZWdIR2ozbHRRam1hN3ktbSJ9.eyJpc3MiOiJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTQwMDE2MDg5OTYzOTE3NjMzNSIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1OTY1MDQyMjgsImV4cCI6MTU5NjUxMTQyOCwiYXpwIjoidDgyNkUyYWdQelpvSzhxbHJKZHR5eWY0T3kyNjBXYm4iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiZ2V0OmFwYXJ0bWVudHMiLCJnZXQ6YmlrZXMiLCJwb3N0OmFwYXJ0bWVudCIsInBvc3Q6YmlrZXMiLCJwb3N0OmJvb2tiaWtlcyJdfQ.mF7QwgFps9Xu0zKqUJcGxXPG-sNuCxLOzoSkHyk2yAh85RFNcC97R1SI-NROBeV2CTPUs6Fvj2b-wIDIqXy-XwJgsdXh98e7-p3gqyxWJcmPm0lz6bSLHKqBNeYjv8gFEMZ6VBTY7s2G_UsiirMXJIp5vnB7aR7kmMBmyPNm0tAWiQYb8vSXfZowtqhlz9B223-l9Jagwlrzlap9MB7B2GzAn9pnfX1kJXhPcxdKSQHgSUPl1IQsUCZUkVofzupSudHvjOojrZAcX7EwXfFM4Onc_Js5IvGLPsUpDU3JufrIxNCHctqgv1BvcvvH0W0uCpnA1qJ0tTrXdhP130ztPg'
        self.customer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Il84Y0pmZWdIR2ozbHRRam1hN3ktbSJ9.eyJpc3MiOiJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDgzNTc2NjcyNDc1MzQ3MDM0MiIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJodHRwczovL3poZXl1LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1OTY1MDY1MzMsImV4cCI6MTU5NjUxMzczMywiYXpwIjoidDgyNkUyYWdQelpvSzhxbHJKZHR5eWY0T3kyNjBXYm4iLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwicGVybWlzc2lvbnMiOlsiZ2V0OmFwYXJ0bWVudHMiLCJnZXQ6YmlrZXMiLCJwb3N0OmJvb2tiaWtlcyJdfQ.SMK7XmHDtCjLmhgV-IYFu0B27dyhvVEDDGEQqKXY1WTJVethw2NZz3N4C87ofLJMn0j6jybvc9ApoXLDi81uuJS8JA3Z9d2MA9z5vCyVBiBhT640C6NrOCYKXOe-F81CLridmeAfas3Dbd8-7_dd5uR9MNkalflPzP9rmpG6B1JOjy70OLEH6cgEswGFEoUjZJDtCqo5brfiWvxfIJ3EY0KbdMWC0XD2oGG4BBWnr3CnN9eXgLVVAEigC2fkgXCLBCUwCoKfR_uvHoPjgPRIuYgUJPVrkbsxiR8Wfxh_-RsVoAlmKsv9u3C1r8efUGCY2IrY7cvzoQb3t-zKlaQlDw'

    def tearDown(self):
        """Executed after reach test"""
        pass

    def test_get_apartments_fails(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().get('/getApartment/-1', headers=headers)
        self.assertEqual(res.status_code, 404)

    def test_get_apartments_passes(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().get('/apartments', headers=headers)
        self.assertEqual(res.status_code, 200)

        res = self.client().get('/getApartment/1', headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_get_bikes_fails(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().get('/getBike/-1', headers=headers)
        self.assertEqual(res.status_code, 404)

        try:
            res = self.client().get('/getBike/1')
        except Exception as e:
            self.assertEqual(e.status_code, 401)

    def test_get_bikes_passes(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().get('/getBike/1', headers=headers)
        self.assertEqual(res.status_code, 200)

        headers = {"Authorization": "Bearer {}".format(self.manager)}
        res = self.client().get('/getBike/1', headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_add_apartment_fails(self):
        data = {'name': "test", 'address': "test", 'picture': ""}
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        try:
            res = self.client().post('/addApartment', data=data, headers=headers)
        except Exception as e:
            self.assertEqual(e.status_code, 401)

    def test_add_apartment_passes(self):
        data = {'name': "test", 'address': "test", 'picture': ""}
        headers = {"Authorization": "Bearer {}".format(self.customer)}

        headers = {"Authorization": "Bearer {}".format(self.manager)}
        res = self.client().post('/addApartment', json=data, headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_delete_bike_fails(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        try:
            res = self.client().get('/bikes/delete//1', headers=headers)
        except Exception as e:
            self.assertEqual(e.status_code, 401)

    def test_add_bike_fails(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        data = {'name': "test", 'description': "test", 'picture': "", 'apartment_id': 1}
        try:
            res = self.client().post('/addBikes', json=data, headers=headers)
        except Exception as e:
            self.assertEqual(e.status_code, 401)

    def test_add_bike_passes(self):
        data = {'name': "test", 'description': "test", 'picture': "", 'apartment_id': 1}
        headers = {"Authorization": "Bearer {}".format(self.manager)}
        res = self.client().post('/addBikes', json=data, headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_get_my_reservation_passes(self):
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().get('/myreservations', headers=headers)
        self.assertEqual(res.status_code, 200)

    def test_book_reservation_fails(self):
        data = {'bike_id': 1, 'start': "2020-08-22 22:02:17", 'end': "2020-08-22 23:02:17"}
        try:
            res = self.client().post('/bookBikes', json=data)
        except Exception as e:
            self.assertEqual(e.status_code, 401)

    def test_book_reservation_passes(self):
        data = {'bike_id': 1, 'start': "2020-08-22 22:02:17", 'end': "2020-08-22 23:02:17"}
        headers = {"Authorization": "Bearer {}".format(self.customer)}
        res = self.client().post('/bookBikes', json=data, headers=headers)
        self.assertEqual(res.status_code, 200)


if __name__ == "__main__":
    unittest.main()