from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField
from blog.models import Hike


class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class HikeUser(AbstractUser):
    CC = 'CC'
    SEAS = 'SEAS'
    BARN = 'BARN'
    GS = 'GS'
    SEASGRAD = 'SEASGRAD'
    ARTSCIGRAD = 'ARTSCIGRAD'
    OTHER = 'OTHER'

    SCHOOL_CHOICES = (
        (CC, 'Columbia College'),
        (SEAS, 'SEAS Undergraduate'),
        (BARN, 'Barnard College'),
        (GS, 'General Studies'),
        (SEASGRAD, 'SEAS Graduate'),
        (ARTSCIGRAD, 'Graduate School of Arts and Sciences'),
    )
    username = None
    email = models.EmailField(_('email address'), unique=True,
                              help_text="Please use a Columbia affiliated email address.")
    school = models.CharField(max_length=100, choices=SCHOOL_CHOICES, default=CC)
    phone_number = PhoneNumberField()
    interest_drive = models.BooleanField(
        "I am 21, have a valid state driver's license, and would like to drive for the club", blank=True, null=True, )
    interest_lead = models.BooleanField(
        "I have led a few hikes before and would like to lead some hikes for the hiking club", blank=True, null=True, )
    hikes = models.ForeignKey(Hike, related_name='hikes', on_delete=models.SET_NULL,
                              blank=True, null=True)
    medical = models.CharField(max_length=500, blank=True, null=True)

    # https://webtrac.cuit.columbia.edu/wbwsc/webtrac.wsc/search.html?display=detail&module=AR&primarycode=44XX

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'first_name', 'last_name', 'phone_number',
        'school', 'interest_lead', 'interest_drive'
    ]

    objects = UserManager()


def __str__(self):
    return "{} {}".format(self.first_name, self.last_name)


def get_fn(self):
    return "{}".format(self.first_name)
