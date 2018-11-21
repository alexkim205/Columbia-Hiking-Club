from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import Group

from rest_framework import serializers, exceptions
from rest_framework.authentication import authenticate
from phonenumber_field.serializerfields import PhoneNumberField

UserModel = get_user_model()


class HikerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email', 'password',
                  'school', 'phone_number', 'hikes',
                  'interest_lead', 'interest_drive')


class CurrentActivitySerializer(HikerSerializer):
    pass


# Override RegisterSerializer
class HikerRegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True, max_length=50)
    last_name = serializers.CharField(required=True, max_length=50)
    email = serializers.EmailField(required=True)
    phone_number = PhoneNumberField(required=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    school = serializers.ChoiceField(required=True, choices=UserModel.SCHOOL_CHOICES)
    interest_drive = serializers.BooleanField()
    interest_lead = serializers.BooleanField()
    medical = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    def user_with_email_exists(self, email):
        return UserModel.objects.filter(email=email).exists()

    def validate_email(self, email):
        if email and self.user_with_email_exists(email):
            raise serializers.ValidationError(
                _("A user is already registered with this e-mail address."))
        return email

    def validate_password(self, password):
        validate_password(password, user=None)
        return password

    def get_cleaned_data(self):
        return {
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
            'school': self.validated_data.get('school', ''),
            'interest_lead': self.validated_data.get('interest_lead', ''),
            'interest_drive': self.validated_data.get('interest_drive', ''),
            'medical': self.validated_data.get('medical', ''),
        }

    def save(self):
        self.cleaned_data = self.get_cleaned_data()
        user = UserModel.objects.create_user(**self.cleaned_data)
        return user


# Override LoginSerializer
# - https://github.com/Tivix/django-rest-auth/blob/master/rest_auth/serializers.py
# - https://iheanyi.com/journal/user-registration-authentication-with-django-django-rest-framework-react-and-redux/
class HikerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def _validate_email(self, email, password):
        user = None

        if email and password:
            user = authenticate(self.context['request'], email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise exceptions.ValidationError(msg)

        return user

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = None

        # Authentication
        if email:
            try:
                user = self._validate_email(email, password)
            except UserModel.DoesNotExist:
                pass

        # Did we get back an active user?
        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise exceptions.ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise exceptions.ValidationError(msg)

        attrs['user'] = user
        return attrs

    def get_cleaned_data(self):
        return {
            'email': self.validated_data.get('email', ''),
            'password': self.validated_data.get('password', ''),
        }
