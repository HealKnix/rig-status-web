from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class NotificationConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "notifications",
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "notifications",
            self.channel_name
        )

    def receive(self, text_data):
        pass

    def send_notification(self, event):
        self.send(text_data=json.dumps({
            'message': event['message']
        }))
