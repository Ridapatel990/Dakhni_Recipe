from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
import jwt

from portal.base import BaseAPIView
from .models import User
from .serializers import (
    UserGetSerializer,
    UserSerializer,
    UserUpdateSerializer,
    SingleUserGetSerializer,
)
from portal.services import trigger_mails
import random


class PasswordLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        data = {}
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response("Invalid Email", status=418)
        if not user.check_password(password):
            return Response("Invalid Password", status=418)
        token = jwt.encode({"id": str(user.id)}, settings.JWT_SECRET, algorithm="HS256")
        data["token"] = token
        data["user"] = UserGetSerializer(user).data
        return Response(data=data, status=200)


class UserView(BaseAPIView):
    model = User
    post_serializer = UserSerializer
    put_serializer = UserUpdateSerializer
    serializer_class = SingleUserGetSerializer
    getall_serializer = UserGetSerializer
    related_models = {}
    search_ignore_fields = []
    order = "registered_on"


class SendOTPView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data.get("email"))
        except User.DoesNotExist:
            return Response("User don't have account, please register.", status=418)
        otp = random.randint(1000, 9999)
        user.otp = otp
        user.is_verified = False
        user.save()
        subject = "Your One-Time Password for Dakhni Recipe App"
        body = f"""Dear {user.name},\n\nThank you for using Dakhni Recipe app. To ensure the security of your account, we have generated a one-time password (OTP) for your authentication.\n\nYour OTP is: {otp}\n\nIf you did not request this OTP or if you have any concerns regarding the security of your account, please contact our support team immediately.\n\nThank you,\nDakhni Recipe Team"""

        recievers = [request.data.get("email")]
        to_cc = ["momin.meenaz29@gmail.com"]
        trigger_mails(subject, body, recievers, to_cc)
        return Response(data={"msg": "OTP sent successfully"}, status=200)


class VerifyOTPView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data.get("email"))
        except User.DoesNotExist:
            return Response("User don't have account, please register.", status=418)
        if user.otp != request.data.get("otp"):
            return Response("Wrong OTP", status=418)
        if user.otp == request.data.get("otp"):
            user.is_verified = True
            user.save()
            return Response(data={"msg": "OTP Verified"}, status=200)


class ChangePasswordView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data.get("email"))
        except User.DoesNotExist:
            return Response("User don't have account, please register.", status=418)
        user.set_password(request.data.get("password"))
        user.save()
        return Response(data={"msg": "Password changed successfully"}, status=200)
