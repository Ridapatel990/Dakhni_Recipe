from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm, UserCreationForm
from accounts.models import User
#Test

class MyUserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'name', 'email', 'is_admin')
    list_filter = ('is_admin',)
    add_fieldsets = (
        (None, {'fields': ('email', 'password1', 'password2', 'is_active')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    fieldsets = (
        (None, {'fields': ('email', 'password', 'is_active')}),
        ('Personal info', {'fields': ('name', 'address', 'profile_pic' )}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    search_fields = ('email', 'name')
    ordering = ('name', 'email', )
    filter_horizontal = ()


admin.site.register(User, MyUserAdmin)
admin.site.unregister(Group)