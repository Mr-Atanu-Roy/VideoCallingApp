from django.urls import path, include
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('room/', room, name='room'),
    path('get_token/', getToken),
    path('create_member/', createMember),
    path('get_member/', getMember),
    path('delete_member/', deleteMember),
]
