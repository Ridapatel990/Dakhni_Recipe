from rest_framework.serializers import ModelSerializer
from .models import User


class UserGetSerializer(ModelSerializer):
    class Meta:
        model = User
        # exclude = ('password', 'last_login')
        exclude = ("last_login", "password", "otp", "is_verified", "chef_status")


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

    def save(self):
        user = User(**self.validated_data)
        password = self.validated_data["password"]
        user.set_password(password)
        user.save()
        return user


class UserUpdateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class SingleUserGetSerializer(ModelSerializer):
    from recipes.serializers import GetAllRecipeSerializer

    recipes = GetAllRecipeSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = "__all__"
