from django.db import models
from django.utils import timezone


class Leader(models.Model):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    on_board = models.BooleanField(default=False)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)

    def get_fn(self):
        return "{}".format(self.first_name)

    class Meta:
        ordering = ('-on_board','last_name',)


class Hike(models.Model):

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

    hike_leaders = models.ManyToManyField(Leader)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    date_of_hike = models.DateTimeField('date and time of hike')
    travel = models.CharField(max_length=200, choices=TRAVEL_CHOICES, default=VAN)
    destination = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(max_length=30, choices=DIFFICULTY_CHOICES, default=EASY)

    def __str__(self):
        leader_dest = "{}'s Hike to {}"
        return leader_dest.format(self.get_hl(), self.destination)

    def get_hl(self):
        count_neg2 = self.hike_leaders.count() - 2 if self.hike_leaders.count() >= 2 else 0
        concat = ", " if self.hike_leaders.count() >= 2 else ""
        oxford = [", ".join(map(lambda x: x.get_fn(), self.hike_leaders.all()[:count_neg2]))] + \
                 [" and ".join(map(lambda x: x.get_fn(), self.hike_leaders.all()[count_neg2:]))]
        return concat.join(oxford)



    def hike_finished(self):
        return timezone.now() > self.date_of_hike

    class Meta:
        ordering = ('date_of_hike',)
