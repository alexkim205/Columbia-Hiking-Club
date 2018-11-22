from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.conf import settings


class HikeBase(models.Model):
    EASY = 'EASY'
    INTM = 'INTERMEDIATE'
    HARD = 'HARD'
    DIFFICULTY_CHOICES = (
        (EASY, 'Easy'),
        (INTM, 'Intermediate'),
        (HARD, 'Hard')
    )

    BUS = 'BUS'
    VAN = 'VAN'
    TRAIN = 'TRAIN'
    NONE = 'NONE'
    TRAVEL_CHOICES = (
        (BUS, 'School Bus'),
        (VAN, 'Van'),
        (TRAIN, 'Metro North'),
        (NONE, 'None')
    )

    EXPOSED_FIELDS = [
        'id', 'str_name', 'pub_date', 'date_of_hike', 'destination', 'description', 'difficulty',
        'hike_leaders', 'travel',
    ]
    READONLY_FIELDS = ['id', 'pk', 'hike_leaders', 'pub_date', 'travel', 'str_name']
    READONLY_ADMIN_FIELDS = ['pub_date']

    hike_leaders = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    date_of_hike = models.DateTimeField('date and time of hike')
    travel = models.CharField(max_length=200, choices=TRAVEL_CHOICES, default=NONE)
    destination = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=30, choices=DIFFICULTY_CHOICES, default=EASY)
    str_name = models.CharField(max_length=100, default="Hike", editable=False)

    def __str__(self):
        leader_dest = "{} Hike to {}"
        return leader_dest.format(self.get_user(), self.destination)

    def get_user(self):
        if self.hike_leaders.count() == 0: return ""
        data = ["{}'s".format(leader.first_name) for leader in self.hike_leaders.all()]
        return ", ".join(data[:-2] + [" and ".join(data[-2:])])

    def hike_finished(self):
        return timezone.now() > self.date_of_hike

    def save(self, *args, **kwargs):
        super(HikeBase, self).save(*args, **kwargs)

    class Meta:
        ordering = ('date_of_hike',)


class Hike(HikeBase):
    # hikers = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=)
    signup_limit = models.PositiveSmallIntegerField('Hikers limit', default=10)

    new_fields = ['signup_limit']
    EXPOSED_FIELDS = HikeBase.EXPOSED_FIELDS + new_fields
    READONLY_FIELDS = HikeBase.READONLY_FIELDS + [new_fields[0]]
    READONLY_ADMIN_FIELDS = HikeBase.READONLY_ADMIN_FIELDS + [new_fields[0]]

    def save(self, *args, **kwargs):
        self.set_max_hikers()
        super().save()

    def set_max_hikers(self):
        # super().clean()
        # set max_hikers based on travel choice
        if self.travel == self.BUS:
            self.signup_limit = 14
        elif self.travel == self.VAN:
            self.signup_limit = 10
        elif self.travel == self.TRAIN:
            self.signup_limit = 9
        else:
            self.signup_limit = 10

    def get_hikers(self):
        return self.objects.hikes.all()

    # def get_hike_leaders(self):
    #     UserModel = get_user_model()
    #     hike_leaders = [UserModel.objects.get(id=user_id) for user_id in self.hike_leaders]
    #     return hike_leaders


class HikeRequest(HikeBase):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='requests', on_delete=models.SET_NULL,
                                   blank=True, null=True)
    want_to_lead = models.BooleanField('I want to lead the hike', blank=True, null=True,
                                       help_text='If you check this box, you will be added to the hike leaders list.')

    new_fields = ['created_by', 'want_to_lead']
    EXPOSED_FIELDS = HikeBase.EXPOSED_FIELDS + new_fields
    READONLY_FIELDS = HikeBase.READONLY_FIELDS + [new_fields[0]]
    READONLY_ADMIN_FIELDS = HikeBase.READONLY_ADMIN_FIELDS + [new_fields[0]]

    def __init__(self, *args, **kwargs):
        super(self.__class__, self).__init__(*args, **kwargs)

    def __str__(self):
        leader_dest = "{} Hike Request to {}"
        return leader_dest.format(self.get_user(), self.destination)

    def get_user(self):
        if self.created_by is None: return ""
        return "{}'s".format(self.created_by.first_name)
