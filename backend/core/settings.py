from pathlib import Path
from environ import environ

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")

JWT_SECRET = env("JWT_SECRET")

DEBUG = True

ALLOWED_HOSTS = [
    "*",
]


# Application definition

INSTALLED_APPS = [
    "django_crontab",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "accounts",
    "recipes",
    "portal",
    "social",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "core.middlewares.AuthMiddleware",
    "core.middlewares.ExceptionMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

AUTH_USER_MODEL = "accounts.User"


MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR.joinpath("media/")
STATIC_URL = "/api/static/"
# STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR.joinpath("static")

CORS_ALLOW_HEADERS = [
    "*",
]

# Ye chalra tha
# CORS_ORIGIN_ALLOW_ALL = True
# # CORS_ALLOW_HEADERS = ["*",]
# CORS_ORIGINS_WHITELIST = [
#     "http://192.168.1.107:8081",
# ]
# CSRF_TRUSTED_ORIGINS = [
#     "http://192.168.1.107:8081",
# ]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


CRONJOBS = [
    ("0 0 * * *", "recipes.cronjob.get_popular_recipes"),  # Run at midnight
    ("0 12 * * *", "recipes.cronjob.get_popular_recipes"),  # Run at noon
    ("0 0 * * *", "recipes.cronjob.get_trending_recipes"),  # Run at midnight
    ("0 12 * * *", "recipes.cronjob.get_trending_recipes"),  # Run at noon
]


EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
 
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_PORT = env('EMAIL_PORT')