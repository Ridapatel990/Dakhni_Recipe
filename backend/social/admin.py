from django.contrib import admin
from .models import *


class RateList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name", "rate")

    def get_recipe_name(self, obj):
        return obj.recipe.name


class ReviewList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name", "comment")

    def get_recipe_name(self, obj):
        return obj.recipe.name


class SavedRecipeList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name", "get_user_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name

    def get_user_name(self, obj):
        return obj.user.name


class RecentlySearchedList(admin.ModelAdmin):
    list_display = ("id", "get_recipe_name", "get_user_name")

    def get_recipe_name(self, obj):
        return obj.recipe.name

    def get_user_name(self, obj):
        return obj.user.name


admin.site.register(Rate, RateList)
admin.site.register(Review, ReviewList)
admin.site.register(SavedRecipe, SavedRecipeList)
admin.site.register(RecentlySearched, RecentlySearchedList)
admin.site.register(Notification)
