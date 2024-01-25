from django.urls import path
from .apis import PasswordLoginView, UserView, SendOTPView, VerifyOTPView, ChangePasswordView, ProfileView

urlpatterns = [
    path('login/', PasswordLoginView.as_view()),
    path('change-password/', ChangePasswordView.as_view()),
    path('sent-otp/', SendOTPView.as_view()),
    path('verify-otp/', VerifyOTPView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('user/<str:id>/', UserView.as_view()),
]