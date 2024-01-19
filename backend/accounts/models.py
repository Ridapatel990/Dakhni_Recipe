from django.db import models
from django.contrib.auth.models import AbstractBaseUser 
from .managers import MyUserManager
from uuid import uuid4

class User(AbstractBaseUser):
    id        = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=128)
    email     = models.EmailField(max_length=255, unique=True)
    is_admin  = models.BooleanField(default=False)
    profession = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    profile_pic = models.ImageField(upload_to="accounts",blank=True,null=True)

    registered_on = models.DateTimeField(auto_now_add=True)

    objects   = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name',]

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
