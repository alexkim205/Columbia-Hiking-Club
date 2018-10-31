from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignupForm(UserCreationForm):
    email = forms.EmailField(max_length=200, help_text='Required')

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

#
# class LeaderSignUpForm(forms.Form):
#     place = forms.CharField(
#         label='Destination',
#         required=True,
#         max_length=100,
#         help_text='The name of the hiking destination you would like to lead.'
#     )
#     date = forms.DateField()

