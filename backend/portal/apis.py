from rest_framework.views import APIView
from rest_framework.response import Response
from recipes.models import PopularRecipe
from .models import Category
from .serializers import CategoryLovSerializer


class CategoryView(APIView):
    def get(self, request):
        return Response(
            data={
                "rows": CategoryLovSerializer(Category.objects.all(), many=True).data
            },
            status=200,
        )


class PopularCategoriesView(APIView):
    def get(self, request):
        category_ids = PopularRecipe.objects.all().values_list(
            "recipe__category__id", flat=True
        )
        return Response(
            data={
                "rows": CategoryLovSerializer(
                    Category.objects.filter(id__in=category_ids), many=True
                ).data
            },
            status=200,
        )
