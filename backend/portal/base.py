from django.db import models
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer
from uuid import uuid4
from django.core.exceptions import ValidationError
from .constants import POST, PUT, DELETE, GET, GETALL
from django.db.models import Q


class BaseModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4,
                          editable=False, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)

    class Meta:
        abstract = True
        ordering = ("-created_at",)

class BaseAPIView(APIView):
    allowed_methods = [GET, GETALL, POST, PUT, DELETE]
    search_ignore_fields = []
    archive_in_delete = False

    def __init__(self):
        self.model = self.get_model()
        self.serializer = self.get_serializer_class()
        self.lookup = self.get_lookup()
        self.query_set = self.get_queryset()
        # self.get_single_query = self.get_queryset()
        self.order = self.get_order()

    def get_lookup(self):
        try:
            return self.lookup_field
        except:
            return 'id'

    def get_serializer_class(self):
        return self.serializer_class

    def get_model(self):
        return self.model

    def get_order(self):
        try:
            return self.order
        except:
            return "-created_at"

    def get_queryset(self):
        try:
            return self.query_set.order_by(self.get_order())
        except:
            return self.model.objects.all().order_by(self.get_order())

    def get_post_serializer(self):
        try:
            return self.post_serializer
        except:
            return self.get_serializer_class()

    def get_getall_serializer(self):
        try:
            return self.getall_serializer
        except:
            return self.get_serializer_class()

    def get_put_serializer(self):
        try:
            return self.put_serializer
        except:
            try:
                return self.post_serializer
            except:
                return self.get_serializer_class()

    def check_if_method_allowed(self, method):
        if method not in self.allowed_methods:
            if method is GETALL:
                return Response({'msg': "Not Found"}, status=404)
            return Response({'msg': "Method not allowed"}, status=405)

    # def search_query_filter(self, search_query):
    #     if search_query:
    #         fields = [f.name for f in self.model._meta.fields]
    #         search_query_filter = Q()
    #         for field in fields:
    #             if field not in self.search_ignore_fields:
    #                 search_query_filter |= Q(
    #                     **{f"{field}__icontains": search_query})
    #         return search_query_filter
    #     else:
    #         return Q()

     ################ -- New Search Query Filter with Related models search impl--#############################
    def search_query_filter(self, search_query, related_fields=None):
        if search_query:
            fields = [
                f.name for f in self.model._meta.fields if not f.is_relation]
            if self.related_models:
                for field_name, model_class in self.related_models.items():
                    related_fields = [
                        f.name for f in model_class._meta.fields if not f.is_relation]
                    fields.extend(
                        [f"{field_name}__{field}" for field in related_fields])
            search_query_filter = Q()
            for field in fields:
                if field not in self.search_ignore_fields:
                    search_query_filter |= Q(
                        **{f"{field}__icontains": search_query})
            return search_query_filter
        else:
            return Q()

    def get(self, request, id=None, *args, **kwargs):
        serializer = self.get_getall_serializer()
        if id == "list":
            if not GETALL in self.allowed_methods:
                return Response({'msg': "Not Found"}, status=404)
            print("get all")
            pg = request.GET.get("pg") or 0
            limit = request.GET.get("limit") or 25
            search = request.GET.get('q', '')
            queryset = self.get_queryset()
            if search:
                queryset = queryset.filter(
                    self.search_query_filter(search_query=search))
            # for param in self.request.query_params:
            #     if param not in ['pg', 'q', 'limit']:
            #         param_value = self.request.query_params[param]
            #         if self.request.query_params[param] == 'true':
            #             param_value = True
            #         if self.request.query_params[param] == 'false':
            #             param_value = False
            #         queryset = queryset.filter(**{param: param_value})
            count = queryset.count()
            objs = queryset[
                int(pg) * int(limit): (int(pg) + 1) * int(limit)
            ]
            return Response(
                data={"data": serializer(
                    objs, many=True).data, "count": count},
                status=200,
            )
        else:
            if not GET in self.allowed_methods:
                return Response({'msg': "Method not allowed"}, status=405)
            print("get by id")
            self.serializer = self.get_serializer_class()
            try:
                return Response(
                    data={"data": self.serializer(
                        self.model.objects.get(id=id)).data},
                    status=200,
                )
            except (self.model.DoesNotExist, ValidationError):
                return Response(
                    data={"object does not exists"}, status=400,)

    def post(self, request, *args, **kwargs):
        if not POST in self.allowed_methods:
            return Response({'msg': "Method not allowed"}, status=405)
        print("in post")

        serializer = self.get_post_serializer()
        serializer = serializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            return Response(data={'msg': 'Saved Successfully', 'id': obj.id}, status=201)
        else:
            return Response(data=serializer.errors, status=400)

    def put(self, request, id=None, *args, **kwargs):
        if not PUT in self.allowed_methods:
            return Response({'msg': "Method not allowed"}, status=405)
        print("in put")
        filter = {self.lookup: id}
        try:
            obj = self.model.objects.get(**filter)
        except (self.model.DoesNotExist, ValidationError):
            return Response(
                data={"object does not exists"}, status=400,)
        serializer = self.get_put_serializer()
        serializer = serializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data={'msg': 'Saved Successfully'}, status=202)
        return Response(data=serializer.errors, status=400)

    def delete(self, request, id=None, *args, **kwargs):
        if not DELETE in self.allowed_methods:
            return Response({'msg': "Method not allowed"}, status=405)
        print("in delete")
        filter = {self.lookup: id}
        try:
            obj = self.model.objects.get(**filter)
            if self.archive_in_delete:
                obj.is_deleted = True
                obj.save()
            else:
                obj.delete()
            return Response(
                data={"msg": "Deleted successfully"},
                status=200,
            )
        except (self.model.DoesNotExist, ValidationError):
            return Response(
                data={"object does not exists"}, status=400,)
