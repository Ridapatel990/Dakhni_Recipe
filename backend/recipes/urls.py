from django.urls import path
from .apis import (
    HomePageView,
    RecipeView,
    PopularRecipeView,
    TrendingRecipeView,
    FilterRecipeView,
    IngredientView
)

urlpatterns = [
    path("home-page/", HomePageView.as_view()),
    path("ingredient/", IngredientView.as_view()),
    path("filter-recipes/", FilterRecipeView.as_view()),
    path("popular-recipes/<str:id>/", PopularRecipeView.as_view()),
    path("trending-recipes/<str:id>/", TrendingRecipeView.as_view()),
    path("<str:id>/", RecipeView.as_view()),
]
