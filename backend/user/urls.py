from django.urls import path
from .views import RegisterView, UserViewSet, LoginView


urlpatterns = [
    path('register/', RegisterView.as_view(), name='Register'),
    path('login/', LoginView.as_view(), name='Login')
]
