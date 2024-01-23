from rest_framework.serializers import ModelSerializer
from .models import SavedRecipe, RecentlySearched, Rate, Review
from recipes.serializers import GetAllRecipeSerializer
from accounts.serializers import UserGetSerializer


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
    recipe = GetAllRecipeSerializer(read_only=True)

    class Meta:
        model = SavedRecipe
        fields = "__all__"


class RecentlySearchedSerializer(ModelSerializer):
    class Meta:
        model = RecentlySearched
        fields = "__all__"


class GetRecentlySearchedSerializer(ModelSerializer):
    recipe = GetAllRecipeSerializer(read_only=True)

    class Meta:
        model = RecentlySearched
        fields = "__all__"
