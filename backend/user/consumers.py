import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ReviewConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.album_id = self.scope['url_route']['kwargs']['album_id']
        self.room_group_name = f'reviews_{self.album_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        review = data['review']

        # Send review to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_review',
                'review': review
            }
        )

    async def send_review(self, event):
        review = event['review']

        # Send review to WebSocket
        await self.send(text_data=json.dumps({
            'review': review
        }))