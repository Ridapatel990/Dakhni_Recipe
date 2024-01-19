from django.urls import path
from .apis import PasswordLoginView, UserView

urlpatterns = [
    path('login/', PasswordLoginView.as_view()),
    path('user/<str:id>/', UserView.as_view()),
]