from django.db import models
from portal.base import BaseModel
from portal.models import Configuration


class Recipe(BaseModel):
    chef = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="recipes"
    )
    category = models.ManyToManyField("portal.Category", blank=True)
    name = models.CharField(max_length=255)
    serve_qty = models.PositiveSmallIntegerField(default=1)
    cooking_time = models.CharField(max_length=255)
    link = models.CharField(max_length=255, blank=True, null=True)
    image1 = models.ImageField(upload_to="recipes", null=True, blank=True)
    image2 = models.ImageField(upload_to="recipes", null=True, blank=True)
    image3 = models.ImageField(upload_to="recipes", null=True, blank=True)
    # video = models.FileField(upload_to="recipes", null=True, blank=True)

    def __str__(self):
        return self.name


class Ingredient(BaseModel):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class IngredientList(BaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE, related_name="ingredient_list"
    )
    quantity = models.CharField(max_length=255)
    unit = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.recipe.name


class Procedure(BaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="procedure"
    )
    order = models.PositiveSmallIntegerField()
    description = models.TextField()


class TrendingRecipe(BaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="trending_recipes"
    )

    def save(self, *args, **kwargs):
        limit = Configuration.objects.first().trending_recipe_limit
        total_objs = TrendingRecipe.objects.all()
        if total_objs.count() == limit:
            total_objs.last().delete()
        super().save(*args, **kwargs)


class PopularRecipe(BaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="popular_recipes"
    )

    def save(self, *args, **kwargs):
        limit = Configuration.objects.first().popular_recipe_limit
        total_objs = PopularRecipe.objects.all()
        # print(total_objs.count(), limit, type(limit))
        if total_objs.count() == limit:
            total_objs.last().delete()
        super().save(*args, **kwargs)
