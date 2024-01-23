from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction
from django.db.models import Q

from portal.base import BaseAPIView
from portal.models import Category
from portal.serializers import CategoryLovSerializer
from portal.constants import GET, GETALL, POST, DELETE
from .models import (
    Recipe,
    Ingredient,
    IngredientList,
    Procedure,
    TrendingRecipe,
    PopularRecipe,
)
from .serializers import (
    RecipeSerializer,
    GetRecipeSerializer,
    GetAllRecipeSerializer,
    TrendingRecipeSerializer,
    PopularRecipeSerializer,
    GetTrendingRecipeSerializer,
    GetPopularRecipeSerializer,
)
from social.models import RecentlySearched


class RecipeView(BaseAPIView):
    model = Recipe
    getall_serializer = GetAllRecipeSerializer
    serializer_class = GetRecipeSerializer
    post_serializer = RecipeSerializer
    related_models = {"category": Category}
    allowed_methods = [GET, GETALL, POST, DELETE]

    def get(self, request, id=None, *args, **kwargs):
        random = request.query_params.get("random")
        if random == "true":
            self.order = "?"
        return super().get(request, id, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            request.data["chef"] = request.thisUser.id
            request.data["serve_qty"] = int(request.data.get("serve_qty"))
            with transaction.atomic():
                recipe_serializer = RecipeSerializer(data=request.data)
                if recipe_serializer.is_valid():
                    recipe = recipe_serializer.save()
                    ingredient_list_to_create = []
                    procedure_to_create = []
                    for ingredient in request.data.get("ingredients"):
                        ingredient["recipe"] = recipe
                        ingredient["ingredient"], _ = Ingredient.objects.get_or_create(
                            name=ingredient.get("name")
                        )
                        del ingredient["name"]
                        ingredient_list_to_create.append(IngredientList(**ingredient))
                    for procedure in request.data.get("procedure"):
                        procedure["recipe"] = recipe
                        procedure["order"] = int(procedure.get("order"))
                        procedure_to_create.append(Procedure(**procedure))
                    IngredientList.objects.bulk_create(ingredient_list_to_create)
                    Procedure.objects.bulk_create(procedure_to_create)
                    return Response(
                        data={"msg": "Saved Successfully", "id": recipe.id}, status=200
                    )
                else:
                    return Response(data=recipe_serializer.errors, status=400)
        except Exception as e:
            if recipe:
                recipe.delete()
            return Response(str(e), status=418)

    def put(self, request, id=None, *args, **kwargs):
        try:
            obj = Recipe.objects.get(id=id)
        except Recipe.DoesNotExist:
            return Response("Object does not exists.", status=418)
        recipe_serializer = RecipeSerializer(obj, data=request.data, partial=True)
        if recipe_serializer.is_valid():
            recipe_serializer.save()
            return Response(data={"msg": "Saved Successfully"}, status=200)
        else:
            return Response(data=recipe_serializer.errors, status=400)


class PopularRecipeView(BaseAPIView):
    model = PopularRecipe
    getall_serializer = GetPopularRecipeSerializer
    serializer_class = PopularRecipeSerializer
    related_models = {"recipe__category": Category}
    allowed_methods = [GETALL]
    query_set = PopularRecipe.objects.all().select_related("recipe")


class TrendingRecipeView(BaseAPIView):
    model = TrendingRecipe
    getall_serializer = GetTrendingRecipeSerializer
    serializer_class = TrendingRecipeSerializer
    related_models = {}
    allowed_methods = [GETALL]
    query_set = TrendingRecipe.objects.all().select_related("recipe")


class FilterRecipeView(APIView):
    def post(self, request, *args, **kwargs):
        time = request.data.get("time")
        rate = request.data.get("rate")
        categories_list = request.data.get("categories")
        filters = Q()
        order_by = "-created_on"
        if rate and rate != "" and rate != "undefined":
            filters &= Q(rate__rate=int(rate))
        if categories_list and len(categories_list) > 0:
            filters &= Q(category__in=categories_list)
        if time == "oldest":
            order_by = "created_on"
        if time == "popularity":
            recently_searched = RecentlySearched.objects.all().values_list(
                "recipe__id", flat=True
            )
            filters &= Q(id__in=recently_searched)
        recipes = Recipe.objects.filter(filters).order_by(order_by)
        return Response(
            data={
                "rows": GetAllRecipeSerializer(recipes, many=True).data,
                "count": recipes.count(),
            },
            status=200,
        )


class HomePageView(APIView):
    def get(self, request, *args, **kwargs):
        limit = 20
        categories = Category.objects.all().order_by("-created_on")
        random_recipes = Recipe.objects.all().order_by("?")[:limit]
        trending_recipes = TrendingRecipe.objects.all().order_by("-created_on")[:limit]
        popular_recipes = PopularRecipe.objects.all().order_by("-created_on")[:limit]
        new_recipes = Recipe.objects.all().order_by("-created_on")[:limit]
        category_ids = PopularRecipe.objects.all().values_list(
            "recipe__category__id", flat=True
        )
        popular_categories = Category.objects.filter(id__in=category_ids).order_by(
            "-created_on"
        )
        data = {
            "category": CategoryLovSerializer(categories, many=True).data,
            "recipes": GetAllRecipeSerializer(random_recipes, many=True).data,
            "trending_recipes": GetTrendingRecipeSerializer(
                trending_recipes, many=True
            ).data,
            "popular_category": CategoryLovSerializer(
                popular_categories, many=True
            ).data,
            "popular_recipes": GetPopularRecipeSerializer(
                popular_recipes, many=True
            ).data,
            "new_recipes": GetAllRecipeSerializer(new_recipes, many=True).data,
        }
        return Response(data={"rows": data}, status=200)

