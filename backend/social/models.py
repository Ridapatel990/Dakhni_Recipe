from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from portal.base import BaseModel


class Rate(BaseModel):
    recipe = models.ForeignKey(
        "recipes.Recipe", on_delete=models.CASCADE, related_name="rate"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="rate"
    )
    rate = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(5),
        ],
    )


class Review(BaseModel):
    recipe = models.ForeignKey(
        "recipes.Recipe", on_delete=models.CASCADE, related_name="review"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="review"
    )
    comment = models.TextField()


class SavedRecipe(BaseModel):
    recipe = models.ForeignKey(
        "recipes.Recipe", on_delete=models.CASCADE, related_name="saved_recipe"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="saved_recipe"
    )


class RecentlySearched(BaseModel):
    recipe = models.ForeignKey(
        "recipes.Recipe", on_delete=models.CASCADE, related_name="recently_searched"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="recently_searched"
    )


class Notification(BaseModel):
    recipe = models.ForeignKey(
        "recipes.Recipe", on_delete=models.CASCADE, related_name="notification"
    )
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="notification"
    )
    is_read = models.BooleanField(default=False)
