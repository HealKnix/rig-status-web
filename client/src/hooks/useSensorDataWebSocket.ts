import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const useSensorDataWebSocket = (sensor_id: number) => {
  const [message, setMessage] = useState<number>(0);

  useEffect(() => {
    if (!import.meta.env.VITE_API_MOCK) {
      const rws = new ReconnectingWebSocket(
        import.meta.env.VITE_WS_URL + `ws/sensor_data/${sensor_id}/`,
      );

      rws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        setMessage(data.message.value);
      };

      return () => {
        rws.close();
      };
    }
  }, []);

  return message;
};
