import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import DenyConnection

logger = logging.getLogger(__name__)

class ReviewConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        try:
            self.album_id = self.scope['url_route']['kwargs']['album_id']
            self.room_group_name = f'reviews_{self.album_id}'

            logger.info(f"Attempting to connect to room {self.room_group_name}")

            await self.channel_layer.group_add(
                self.room_group_name,
                self.channel_name
            )

            await self.accept()
            logger.info(f"Successfully connected to room {self.room_group_name}")
        except Exception as e:
            logger.error(f"Error in connect for room {self.room_group_name}: {str(e)}")
            raise DenyConnection("Connection failed")

    async def disconnect(self, close_code):
        try:
            logger.info(f"Disconnecting from room {self.room_group_name}, close code: {close_code}")
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )
        except Exception as e:
            logger.error(f"Error in disconnect for room {self.room_group_name}: {str(e)}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            review = data['review']
            logger.info(f"Received review for room {self.room_group_name}: {review}")

            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'send_review',
                    'review': review
                }
            )
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON received in room {self.room_group_name}: {str(e)}")
        except KeyError as e:
            logger.error(f"Missing 'review' key in received data for room {self.room_group_name}: {str(e)}")
        except Exception as e:
            logger.error(f"Error in receive for room {self.room_group_name}: {str(e)}")

    async def send_review(self, event):
        try:
            review = event['review']
            await self.send(text_data=json.dumps({
                'review': review
            }))
            logger.info(f"Sent review to WebSocket in room {self.room_group_name}")
        except Exception as e:
            logger.error(f"Error in send_review for room {self.room_group_name}: {str(e)}")