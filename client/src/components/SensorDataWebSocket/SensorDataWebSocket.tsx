import { FC, useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

interface SensorDataWebSocketProps {
  sensor_id: number;
}

const SensorDataWebSocket: FC<SensorDataWebSocketProps> = ({ sensor_id }) => {
  const [messages, setMessages] = useState<string>('---');

  useEffect(() => {
    const rws = new ReconnectingWebSocket(
      import.meta.env.VITE_WS_URL + `ws/sensor_data/${sensor_id}/`,
    );

    rws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      setMessages(data.message.value);
    };

    return () => {
      rws.close();
    };
  }, []);

  return (
    <div>
      <h1>Значение из датчика</h1>
      <ul>
        <li>{messages}</li>
      </ul>
    </div>
  );
};

export default SensorDataWebSocket;
