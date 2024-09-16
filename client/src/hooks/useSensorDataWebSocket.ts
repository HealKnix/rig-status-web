import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

import { SensorData } from '@/models/SensorData';

const useSensorDataWebSocketProduction = (sensor_id: number) => {
  const [sensorDataWebsocket, setSensorDataWebsocket] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const rws = new ReconnectingWebSocket(
      import.meta.env.VITE_WS_URL + `ws/sensor_data/${sensor_id}/`,
    );

    rws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data).message as SensorData;

      setSensorDataWebsocket(data.value);
    };

    return () => {
      rws.close();
    };
  }, []);

  return sensorDataWebsocket;
};

const useSensorDataWebSocketMock = () => 0;

export const useSensorDataWebSocket =
  import.meta.env.VITE_API_MOCK === 'false'
    ? useSensorDataWebSocketProduction
    : useSensorDataWebSocketMock;
