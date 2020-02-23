"""
Django settings for melon project.

Generated by 'django-admin startproject' using Django 3.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import logging
import os

import django_heroku

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s:%(name)s:%(message)s')

file_handler = logging.FileHandler('settings.log')
file_handler.setLevel(logging.ERROR)
file_handler.setFormatter(formatter)

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(stream_handler)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = '+%!qr0*t62rfkis+sa%17c^vro*v*^@^!=pug=8h-fzu&%$8^@'
SECRET_KEY = os.environ.get('MELON_SECRET_KEY')
# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = True
DEBUG = os.environ.get('MELON_DEBUG')
if DEBUG:
    logger.debug(' DEBUG is {}'.format( DEBUG ))
# list of allowed hosts
ALLOWED_HOSTS = ["mymelonapp.herokuapp.com", "localhost", "127.0.0.1", "10.10.1.*"]
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'phone_field',
    'gunicorn',
    'melon.users',
    'melon.contact',
    'corsheaders',
    'melon.home',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.BrokenLinkEmailsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'corsheaders.middleware.CorsPostCsrfMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'melon.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'melonfront')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'melon.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
# if os.environ.get('MELON_DEBUG') not True, then the project it run on heroku
if DEBUG:
    DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.postgresql_psycopg2',
                'NAME': os.environ.get('MELON_DBNAME'),
                'USER': os.environ.get('MELON_DBUSER'),
                'PASSWORD': os.environ.get('MELON_DBPASSWORD'),
                'HOST': os.environ.get('MELON_DBHOST'),
                'PORT': os.environ.get('MELON_DBPORT'),
        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_PAGINATION_CLASS': 'melon.contact.core.pagination.MelonLimitOffsetPagination',
    # MelonPagination size
    'PAGE_SIZE': 50,
    # comment DEFAULT_RENDERER_CLASSES block, under development
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework.renderers.JSONRenderer',
    # ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles/")
REACT_APP_DIR = os.path.join(BASE_DIR, 'melonfront')

STATICFILES_DIRS = (
    os.path.join(REACT_APP_DIR, 'build', 'static'),  # update the STATICFILES_DIRS
)

# start CORS and CSRF
CORS_ORIGIN_ALLOW_ALL = False
# CORS_ORIGIN_ALLOW_ALL if True, then it can be blocked by IP or Name, so the code to the end line has no effect
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    "https://mymelonapp.herokuapp.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://10.10.1.*:3000",
]

CSRF_TRUSTED_ORIGINS = [
    'mymelonapp.herokuapp.com'
    'localhost',
    '127.0.0.1',
    '10.10.1.*',
]


SECURE_HSTS_SECONDS = 518400

# end ORS and CSRF
django_heroku.settings(locals())
