from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from social.views import *

urlpatterns = [
    # path("", index),
    # path("send/", send),
    # path("firebase-messaging-sw.js", showFirebaseJS, name="show_firebase_js"),
    path("admin/", admin.site.urls),
    path("api/accounts/", include("accounts.urls")),
    path("api/recipes/", include("recipes.urls")),
    path("api/portal/", include("portal.urls")),
    path("api/social/", include("social.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(
        "/api" + settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )