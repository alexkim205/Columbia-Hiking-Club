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

    class Meta:
        ordering = ('date_of_hike',)


class Hike(HikeBase):
    pass


class HikeRequest(HikeBase):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, blank=True, null=True)
    want_to_lead = models.BooleanField('I want to lead the hike', blank=True, null=True,
                                       help_text='If you check this box, you will be added to the hike leaders list.')

    EXPOSED_FIELDS = [
        'created_by', 'pub_date', 'date_of_hike', 'destination', 'description', 'difficulty',
        'want_to_lead', 'hike_leaders', 'travel'
    ]
    READONLY_FIELDS = ('pk', 'hike_leaders', 'pub_date', 'travel', 'str_name', 'created_by')
    READONLY_ADMIN_FIELDS = ('created_by', 'pub_date')

    def __init__(self, *args, **kwargs):
        super(self.__class__, self).__init__(*args, **kwargs)

    def __str__(self):
        leader_dest = "{} Hike Request to {}"
        return leader_dest.format(self.get_user(), self.destination)

    def get_user(self):
        if self.created_by is None: return ""
        return "{}'s".format(self.created_by.first_name)

    def save(self, *args, **kwargs):
        # user = kwargs.pop('user', None)
        # will_lead = kwargs.pop('will_lead', None)

        # define user who requested
        # self.user_who_requested = user

        # # If user wants to lead hike
        # if will_lead:
        #     # add user to hike leaders group
        #     leaders_group = Group.objects.get(name='Hike Leaders')
        #     leaders_group.user_set.add(user)
        #
        #     # add user to hike leaders
        #     self.hike_leaders.add(user)
        #     self.str_name = str(self)
        # else:
        #     self.str_name = "Hike Request to {}".format(self.destination)

        super(HikeRequest, self).save(*args, **kwargs)
