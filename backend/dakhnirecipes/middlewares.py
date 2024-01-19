from accounts.models import User
from django.http import JsonResponse
from django.conf import settings
import jwt
import json

class AuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.headers.get("x-access-token")
        if (
            request.path.startswith("/api/admin")
            or request.path.startswith("admin/")
            or request.path.startswith("/api/accounts/login")
            or request.path.startswith("/static/")
            or request.path.startswith("/media/")
            or request.path.startswith("/api/media/")
        ):
            response = self.get_response(request)
            return response
        if not token:
            # print(request.path)
            return JsonResponse(
                data={"msg": "Token not provided"}, status=403
            )
        try:
            jwt_data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
            request.thisUser = User.objects.get(id=jwt_data["id"])
            response = self.get_response(request)
            return response
        except (jwt.exceptions.InvalidSignatureError, User.DoesNotExist):
            return JsonResponse(
                data={"msg": "Invalid token"}, status=401
            )

class ExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response is not None and response.status_code == 400:
            response.render()
            errors = []
            try:
                error_data = json.loads(response.content)
                if isinstance(error_data, dict):
                    errors = [
                        f"{messages[0]} - ({field.capitalize()})" for field, messages in error_data.items()]
                elif isinstance(error_data, list) and len(error_data) > 0:
                    errors = [error_data[0]]
            except (ValueError, AttributeError) as e:
                errors = ["Something went wrong"]
                # errors = ["An unknown error occurred"]
            except Exception as e:
                errors = ["Something went wrong"]
                # errors = ["An unknown error occurred"]

            if not errors:
                errors = ["Something went wrong"]
                # errors = ["An unknown error occurred"]

            response = JsonResponse({"errors": errors}, status=400)
        elif response.status_code == 418:
            responseLst = []
            responseLst.append(json.loads(response.content))
            # response = JsonResponse({"errors": json.loads(response.content)}, status=400)
            response = JsonResponse({"errors": responseLst}, status=400)

        return response
