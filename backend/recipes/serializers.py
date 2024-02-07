from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework import serializers
from django.db.models import Q
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
from social.models import Rate, SavedRecipe, Review
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
    # ingredient = IngredientLovSerializer(read_only=True)
    name = serializers.CharField(source="ingredient.name")

    class Meta:
        model = IngredientList
        fields = ["id", "quantity", "unit", "name"]


class ProcedureSerializer(ModelSerializer):
    class Meta:
        model = Procedure
        fields = "__all__"


class GetRecipeSerializer(ModelSerializer):
    rate = SerializerMethodField()
    is_saved = SerializerMethodField()
    reviews = SerializerMethodField()
    chef = UserGetSerializer(read_only=True)
    ingredients = GetIngredientListSerializer(read_only=True, many=True)
    procedures = SerializerMethodField()
    category = CategoryLovSerializer(read_only=True, many=True)

    def get_procedures(self, obj):
        return ProcedureSerializer(
            Procedure.objects.filter(recipe=obj.id).order_by("order"), many=True
        ).data

    def get_rate(slef, obj):
        # print(obj)
        avg_rate = Rate.objects.filter(recipe=obj).aggregate(Avg("rate"))
        return (
            str(round(avg_rate.get("rate__avg"), 1))
            if avg_rate.get("rate__avg")
            else 0.0
        )

    def get_reviews(self, obj):
        return Review.objects.filter(recipe=obj).count()

    def get_is_saved(self, obj):
        user = self.context.get("user")
        if SavedRecipe.objects.filter(Q(user=user) & Q(recipe=obj)).exists():
            return True
        return False

    class Meta:
        model = Recipe
        fields = "__all__"


class GetAllRecipeSerializer(ModelSerializer):
    rate = SerializerMethodField()
    is_saved = SerializerMethodField()

    def get_is_saved(self, obj):
        user = self.context.get("user")
        if SavedRecipe.objects.filter(Q(user=user) & Q(recipe=obj)).exists():
            return True
        return False

    def get_rate(slef, obj):
        # print(obj)
        avg_rate = Rate.objects.filter(recipe=obj).aggregate(Avg("rate"))
        return (
            str(round(avg_rate.get("rate__avg"), 1))
            if avg_rate.get("rate__avg")
            else 0.0
        )

    class Meta:
        model = Recipe
        exclude = ["category", "chef", "created_on", "updated_on", "is_deleted"]


class TrendingRecipeSerializer(ModelSerializer):
    class Meta:
        model = TrendingRecipe
        fields = "__all__"


class GetTrendingRecipeSerializer(ModelSerializer):
    # recipe = GetAllRecipeSerializer(read_only=True)
    recipe = SerializerMethodField()

    def get_recipe(self, obj):
        user = self.context.get("user")
        return GetAllRecipeSerializer(
            Recipe.objects.filter(trending_recipes=obj.id).first(),
            context={"user": user},
        ).data

    class Meta:
        model = TrendingRecipe
        fields = ["id", "recipe"]


class PopularRecipeSerializer(ModelSerializer):
    class Meta:
        model = PopularRecipe
        fields = "__all__"


class GetPopularRecipeSerializer(ModelSerializer):
    # recipe = GetAllRecipeSerializer(read_only=True)\

    recipe = SerializerMethodField()

    def get_recipe(self, obj):
        user = self.context.get("user")
        return GetAllRecipeSerializer(
            Recipe.objects.filter(popular_recipes=obj).first(), context={"user": user}
        ).data

    class Meta:
        model = PopularRecipe
        fields = ["id", "recipe"]
