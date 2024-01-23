from django.contrib import admin
from .models import *


class PopularRecipeList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name


class TrendingRecipeList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name


admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Procedure)
admin.site.register(TrendingRecipe, TrendingRecipeList)
admin.site.register(PopularRecipe, PopularRecipeList)
admin.site.register(IngredientList)
