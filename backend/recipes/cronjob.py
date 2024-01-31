from django.db.models import F
from .models import PopularRecipe, TrendingRecipe
from portal.models import Configuration
from recipes.models import Recipe
from social.models import RecentlySearched


def get_trending_recipes():
    rate_limit = Configuration.objects.all().first().popular_recipe_rate
    recipes = (
        Recipe.objects.filter(rate__rate__gte=rate_limit)
        .distinct()
        .order_by("rate__rate")
    )
    for recipe in recipes:
        if TrendingRecipe.objects.filter(recipe=recipe).exists:
            continue
        TrendingRecipe.objects.create(recipe=recipe)


def get_popular_recipes():
    recently_searched = RecentlySearched.objects.all().values_list(
        "recipe__id", flat=True
    )
    recipes = Recipe.objects.filter(id__in=recently_searched).order_by(F("id").desc())
    # recipes = Recipe.objects.filter(id__in=recently_searched).order_by("-id")
    # recipes = Recipe.objects.filter(id__in=recently_searched).distinct()
    for recipe in recipes:
        if PopularRecipe.objects.filter(recipe=recipe).exists:
            continue
        PopularRecipe.objects.create(recipe=recipe)
