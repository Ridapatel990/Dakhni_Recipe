from django.contrib import admin
from .models import *


class ConfigurationList(admin.ModelAdmin):
    list_display = (
        "trending_recipe_limit",
        "popular_recipe_limit",
        "popular_recipe_rate",
    )


class CategoryList(admin.ModelAdmin):
    list_display = ("id", "name")


admin.site.register(Category, CategoryList)
admin.site.register(Configuration, ConfigurationList)
