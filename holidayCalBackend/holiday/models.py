from django.db import models
from django.core.exceptions import ValidationError
from jsonfield import JSONField
from datetime import datetime

class Holiday(models.Model):
  id = models.AutoField(primary_key=True)
  city_name = models.CharField(max_length=240)
  date = models.DateField()
  holidayName = models.CharField(max_length=240)
class Admin(models.Model):
  id = models.AutoField(primary_key=True)
  admin_name = models.CharField(max_length=240)
  admin_email = models.EmailField()
  password = models.CharField(max_length=240)

class Cities(models.Model):
  id = models.AutoField(primary_key=True)
  cityName = models.CharField(max_length=240)  