from django.urls import re_path
from user.consumers import ReviewConsumer

websocket_urlpatterns = [
    re_path(r'ws/reviews/(?P<album_id>\d+)/$', ReviewConsumer.as_asgi()),  
]