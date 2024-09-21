import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const useSensorDataWebSocketProduction = (rig_id: number | string) => {
  const [sensorDataWebsocket, setSensorDataWebsocket] = useState<Record<
    string,
    number
  > | null>(null);

  const getSensorData = (sensor_id: number) => sensorDataWebsocket?.[sensor_id];

  useEffect(() => {
    const rws = new ReconnectingWebSocket(
      import.meta.env.VITE_WS_URL + `ws/sensor_data/${rig_id}/`,
    );

    rws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data).message;

      setSensorDataWebsocket(data.value);
    };

    return () => {
      rws.close();
    };
  }, []);

  return getSensorData;
};

const useSensorDataWebSocketMock = () => () => 0;

export const useSensorDataWebSocket =
  import.meta.env.VITE_API_MOCK === 'false'
    ? useSensorDataWebSocketProduction
    : useSensorDataWebSocketMock;
