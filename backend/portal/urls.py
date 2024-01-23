from django.urls import path
from .apis import PopularCategoriesView, CategoryView

urlpatterns = [
    path("category/", CategoryView.as_view()),
    path("popular-categories/", PopularCategoriesView.as_view()),
]
