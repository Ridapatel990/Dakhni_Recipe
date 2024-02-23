from django.urls import path
from .apis import (
    RecentlSearchedRecipeView,
    SavedRecipeView,
    RateRecipeView,
    ReviewRecipeView,
    NotificationView
)

urlpatterns = [
    path("notification/<str:id>/", NotificationView.as_view()),
    path("rate-recipe/<str:id>/", RateRecipeView.as_view()),
    path("recently-search-recipe/<str:id>/", RecentlSearchedRecipeView.as_view()),
    path("review-recipe/<str:id>/", ReviewRecipeView.as_view()),
    path("saved-recipe/<str:id>/", SavedRecipeView.as_view()),
]