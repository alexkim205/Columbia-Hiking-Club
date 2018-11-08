from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status
# from rest_framework.authtoken.models import Token

from knox.auth import AuthToken


# Create your tests here.

class AccountsTest(APITestCase):

    def setUp(self):
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@email.com',
            'password': 'johnspassword'
        }
        self.model = get_user_model()
        self.test_user = self.model.objects.create_user(**data)
        self.create_url = reverse('auth_register')
        self.login_url = reverse('auth_login')
        self.current_url = reverse('current_user_api')

    def test_create_user_returns_serialized_token(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'email': 'janedoe@email.com',
            'password': 'janespassword'
        }

        response = self.client.post(self.create_url, data, format='json')
        user = self.model.objects.latest('id')

        # Check that two users are in the database
        self.assertEqual(self.model.objects.count(), 2)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Additionally, we want to return the username and email upon successful creation.
        self.assertEqual(response.data['user']['first_name'], data['first_name'])
        self.assertEqual(response.data['user']['last_name'], data['last_name'])
        self.assertEqual(response.data['user']['email'], data['email'])
        self.assertIn('password', response.data['user'])
        # self.assertFalse('password' in response.data)

        # Check if token is returned
        self.assertIn('token', response.data)

    def test_create_user_with_short_password(self):
        """
        Ensure user is not created for password lengths less than 8.
        """
        data = {
            'first_name': 'Jack',
            'last_name': 'Doe',
            'email': 'jack@example.com',
            'password': 'foo'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.model.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_no_password(self):
        data = {
            'first_name': 'Jill',
            'last_name': 'Doe',
            'email': 'jil@example.com',
            'password': ''
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.model.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'email': 'johndoe@email.com',
            'password': 'janespassword'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(self.model.objects.count(), 1)
        self.assertEqual(len(response.data['email']), 1)

    def test_login_user(self):
        auth_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@email.com',
            'password': 'johnspassword'
        }
        login_data = {
            'email': 'johndoe@email.com',
            'password': 'johnspassword'
        }

        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(response.data['user']['first_name'], auth_data['first_name'])
        self.assertEqual(response.data['user']['last_name'], auth_data['last_name'])
        self.assertEqual(response.data['user']['email'], auth_data['email'])
        self.assertIn('password', response.data['user'])

    def test_get_current_user(self):
        auth_data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'johndoe@email.com',
            'password': 'johnspassword'
        }
        login_data = {
            'email': 'johndoe@email.com',
            'password': 'johnspassword'
        }

        # First login to get Auth Token
        auth_response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(auth_response.status_code, status.HTTP_201_CREATED)
        token = auth_response.data['token']

        # Use Auth Token to check current user
        self.client.credentials(HTTP_AUTHORIZATION=('Token %s' % token))
        current_response = self.client.get(self.current_url, format='json',)

        self.assertEqual(current_response.data['first_name'], auth_data['first_name'])
        self.assertEqual(current_response.data['last_name'], auth_data['last_name'])
        self.assertEqual(current_response.data['email'], auth_data['email'])
        self.assertIn('password', current_response.data)
