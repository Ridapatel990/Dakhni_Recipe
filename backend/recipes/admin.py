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


class ProcedureList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name


class IngredientListList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name", "get_ingredient_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name

    def get_ingredient_name(self, obj):
        return obj.ingredient.name


admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Procedure, ProcedureList)
admin.site.register(TrendingRecipe, TrendingRecipeList)
admin.site.register(PopularRecipe, PopularRecipeList)
admin.site.register(IngredientList,IngredientListList)
