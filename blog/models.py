from django.db import models
from django.utils import timezone
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
        'id', 'pub_date', 'date_of_hike', 'destination', 'description', 'difficulty',
        'hike_leaders', 'travel', 'str_name'
    ]
    READONLY_FIELDS = ['id', 'pk', 'hike_leaders', 'pub_date', 'travel', 'str_name']
    READONLY_ADMIN_FIELDS = ['pub_date']

    hike_leaders = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    date_of_hike = models.DateTimeField('date and time of hike')
    travel = models.CharField(max_length=200, choices=TRAVEL_CHOICES, default=VAN)
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
    pass


class HikeRequest(HikeBase):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
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
