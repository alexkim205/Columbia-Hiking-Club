from django.utils import timezone

from django import forms
from .models import *


class HikeRequestForm(forms.ModelForm):
    want_to_lead = forms.BooleanField(label='I want to lead the hike')
    date_of_hike = forms.DateTimeField('%Y-%m-%d %H:%M:%S')

    class Meta:
        model = HikeRequest
        fields = ['user_who_requested', 'date_of_hike', 'travel', 'destination', 'description', 'difficulty']

    def clean_date_of_hike(self):
        date = self.cleaned_data['date_of_hike']
        errors = []
        # Day chosen isn't weekday
        if date.weekday() < 5:
            errors.append(forms.ValidationError(_('Hikes can only be led on the weekends'), code='isWeekend'))

        # Day is not at least two weeks in advance
        if date.today() > (timezone.datetime.today() + timezone.timedelta(days=14)):
            errors.append(forms.ValidationError(_('Please choose a date at least two weeks in the future'), code='isTwoWeeks'))

        # Day isn't available
        if 0:  # implement
            pass

        raise forms.ValidationError(errors)
