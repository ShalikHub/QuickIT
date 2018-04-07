from django.db import models

class Earning(models.model):
  DeliveryDone = models.INTField(max_length=25000)
