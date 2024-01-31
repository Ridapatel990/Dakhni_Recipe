from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import SavedRecipe, RecentlySearched, Rate, Review, Notification
from recipes.serializers import GetAllRecipeSerializer
from accounts.serializers import UserGetSerializer
from recipes.models import Recipe


class RateSerializer(ModelSerializer):
    class Meta:
        model = Rate
        fields = "__all__"


class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class GetReviewSerializer(ModelSerializer):
    user = UserGetSerializer(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"


class SavedRecipeSerializer(ModelSerializer):
    class Meta:
        model = SavedRecipe
        fields = "__all__"


class GetSavedRecipeSerializer(ModelSerializer):
    # recipe = GetAllRecipeSerializer(read_only=True)

    recipe = SerializerMethodField()

    def get_recipe(self, obj):
        user = self.context.get("user")
        return GetAllRecipeSerializer(
            Recipe.objects.filter(saved_recipe=obj.id).first(),
            context={"user": user},
        ).data

    class Meta:
        model = SavedRecipe
        fields = "__all__"


class RecentlySearchedSerializer(ModelSerializer):
    class Meta:
        model = RecentlySearched
        fields = "__all__"


class GetRecentlySearchedSerializer(ModelSerializer):
    # recipe = GetAllRecipeSerializer(read_only=True)

    recipe = SerializerMethodField()

    def get_recipe(self, obj):
        user = self.context.get("user")
        return GetAllRecipeSerializer(
            Recipe.objects.filter(recently_searched=obj.id).first(),
            context={"user": user},
        ).data

    class Meta:
        model = RecentlySearched
        fields = "__all__"


class GetNotificationSerializer(ModelSerializer):
    recipe = GetAllRecipeSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
