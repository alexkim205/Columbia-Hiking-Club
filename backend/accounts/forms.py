from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, get_user_model
from django.conf import settings


class SignupForm(UserCreationForm):

    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'email', 'password1', 'password2')


class LoginForm(AuthenticationForm):

    class Meta:
        model = get_user_model()
        fields = ('email', 'password')



#
# class LeaderSignUpForm(forms.Form):
#     place = forms.CharField(
#         label='Destination',
#         required=True,
#         max_length=100,
#         help_text='The name of the hiking destination you would like to lead.'
#     )
#     date = forms.DateField()

