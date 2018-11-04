from django.db import models
from django.utils import timezone
from accounts.models import HikeUser
from django.contrib.auth.models import Group


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

    hike_leaders = models.ManyToManyField(HikeUser)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    date_of_hike = models.DateTimeField('date and time of hike')
    travel = models.CharField(max_length=200, choices=TRAVEL_CHOICES, default=VAN)
    destination = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=30, choices=DIFFICULTY_CHOICES, default=EASY)
    str_name = models.CharField(max_length=100, default="Hike", editable=False)

    def __str__(self):
        leader_dest = "{} Hike to {}"
        return leader_dest.format(self.get_hl(), self.destination)

    def get_hl(self):
        data = ["{}'s".format(leader.first_name) for leader in self.hike_leaders.all()]
        return ", ".join(data[:-2] + [" and ".join(data[-2:])])

    def hike_finished(self):
        return timezone.now() > self.date_of_hike

    class Meta:
        ordering = ('date_of_hike',)


class Hike(HikeBase):

    def save(self, *args, **kwargs):

        super(Hike, self).save(*args, **kwargs)
        if self.hike_leaders.count() > 0:
            self.str_name = str(self)
        else:
            self.str_name = "Hike to {}".format(self.destination)

        super(Hike, self).save(*args, **kwargs)

    pass


class HikeRequest(HikeBase):
    user_who_requested = models.ForeignKey(HikeUser, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        leader_dest = "{}'s Hike Request to {}"
        return leader_dest.format(self.get_hl(), self.destination)

    def save(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        will_lead = kwargs.pop('will_lead', None)

        super(HikeRequest, self).save(*args, **kwargs)

        # define user who requested
        self.user_who_requested = user

        # If user wants to lead hike
        if will_lead:
            # add user to hike leaders group
            leaders_group = Group.objects.get(name='Hike Leaders')
            leaders_group.user_set.add(user)

            # add user to hike leaders
            self.hike_leaders.add(user)
            self.str_name = str(self)
        else:
            self.str_name = "Hike Request to {}".format(self.destination)

        super(HikeRequest, self).save(*args, **kwargs)
