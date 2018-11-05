from django.utils import timezone
from django.utils.translation import gettext as _
from django import forms

from .models import HikeRequest


class HikeRequestForm(forms.ModelForm):

    class Meta:
        model = HikeRequest
        fields = HikeRequest.EXPOSED_FIELDS
        exclude = HikeRequest.READONLY_FIELDS

    def clean_date_of_hike(self):
        date = self.cleaned_data['date_of_hike']
        print(date)
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

        if len(errors) != 0:
            raise forms.ValidationError(errors)

        return date
