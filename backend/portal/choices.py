from django.db import models
from .constants import *


class GenderChoices(models.TextChoices):
    MALE = MALE, MALE
    FEMALE = FEMALE, FEMALE
    OTHER = OTHER, OTHER


class ChefStatusChoices(models.TextChoices):
    PREPROCESSED = PREPROCESSED, PREPROCESSED
    SENT = SENT, SENT
    REJECTED = REJECTED, REJECTED
    APPROVED = APPROVED, APPROVED
