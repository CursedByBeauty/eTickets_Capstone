from authentication.models import User
from django.db import models

# Create your models here.


class Workorders(models.Model):

    ENTRY_CHOICES = [
        ('Enter', 'Enter Anytime'),
        ('Call', 'Call Before Entry'),
    ]

    PRIORITY_CHOICES = [
        ('H', 'High'),
        ('M', 'Medium'),
        ('L', 'Low'),
        ('None', 'No Priority'),
    ]

    STATUS_CHOICES = [
            ('I', 'Incomplete'),
            ('H', 'On Hold'),
            ('C', 'Complete'),
    ]

    resident = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    unit = models.IntegerField()
    subject = models.CharField(max_length=50)
    comments = models.CharField(max_length=255)
    entry = models.CharField(max_length=30, choices=ENTRY_CHOICES, default='Enter')
    priority = models.CharField(max_length=15, choices=PRIORITY_CHOICES, default='None')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default= 'I')
    

