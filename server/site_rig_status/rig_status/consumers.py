import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class SensorDataConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "sensor_data",
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "sensor_data",
            self.channel_name
        )

    def receive(self, text_data):
        pass

    def send_sensor_data(self, event):
        self.send(text_data=json.dumps({
            'data': event['data']
        }))


class RigConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            "rig",
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "rig",
            self.channel_name
        )

    def receive(self, text_data):
        pass

    def send_rig(self, event):
        self.send(text_data=json.dumps({
            'data': event['data']
        }))
