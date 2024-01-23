from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from .base import BaseModel


class Configuration(BaseModel):
    trending_recipe_limit = models.IntegerField()
    popular_recipe_limit = models.IntegerField()
    popular_recipe_rate = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(5),
        ],
    )

    def save(self, *args, **kwargs):
        total_objs = Configuration.objects.all()
        if len(total_objs) == 1:
            total_objs.delete()
        super().save(*args, **kwargs)


class Category(BaseModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name
