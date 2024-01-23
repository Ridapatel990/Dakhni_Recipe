from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.db.models import Avg
from .models import (
    Recipe,
    Ingredient,
    IngredientList,
    Procedure,
    TrendingRecipe,
    PopularRecipe,
)
from portal.serializers import CategoryLovSerializer
from social.models import Rate
from accounts.serializers import UserGetSerializer


class RecipeSerializer(ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"


class PostRecipeserializer(ModelSerializer):
    class Meta:
        model = Recipe
        exclude = ["category"]


class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class IngredientLovSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ["id", "name"]


class GetIngredientListSerializer(ModelSerializer):
    ingredient = IngredientLovSerializer(read_only=True)

    class Meta:
        model = IngredientList
        fields = ["id", "ingredient"]


class ProcedureSerializer(ModelSerializer):
    class Meta:
        model = Procedure
        fields = "__all__"


class GetRecipeSerializer(ModelSerializer):

    chef = UserGetSerializer(read_only=True)
    ingredients = GetIngredientListSerializer(read_only=True, many=True)
    procedure = ProcedureSerializer(read_only=True, many=True)
    category = CategoryLovSerializer(read_only=True, many=True)

    class Meta:
        model = Recipe
        fields = "__all__"


class GetAllRecipeSerializer(ModelSerializer):
    rate = SerializerMethodField()

    def get_rate(slef, obj):
        avg_rate = Rate.objects.filter(recipe=obj.id).aggregate(Avg("rate"))
        return avg_rate.get("rate__avg") if avg_rate.get("rate__avg") else 0

    class Meta:
        model = Recipe
        exclude = ["category", "chef", "created_on", "updated_on", "is_deleted"]


class TrendingRecipeSerializer(ModelSerializer):
    class Meta:
        model = TrendingRecipe
        fields = "__all__"


class GetTrendingRecipeSerializer(ModelSerializer):
    recipe = GetAllRecipeSerializer(read_only=True)

    class Meta:
        model = TrendingRecipe
        fields = ["id", "recipe"]


class PopularRecipeSerializer(ModelSerializer):
    class Meta:
        model = PopularRecipe
        fields = "__all__"


class GetPopularRecipeSerializer(ModelSerializer):
    recipe = GetAllRecipeSerializer(read_only=True)

    class Meta:
        model = PopularRecipe
        fields = ["id", "recipe"]
