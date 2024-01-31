from rest_framework.serializers import ModelSerializer, SerializerMethodField
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

    # recipes = GetAllRecipeSerializer(read_only=True, many=True)
    recipes = SerializerMethodField()

    def get_recipes(self,obj):
        from recipes.serializers import GetAllRecipeSerializer
        from recipes.models import Recipe
        return GetAllRecipeSerializer(Recipe.objects.filter(chef=obj), many=True, context={"user":obj}).data

    class Meta:
        model = User
        fields = "__all__"
