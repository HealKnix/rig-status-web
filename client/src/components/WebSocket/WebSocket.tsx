import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const rws = new ReconnectingWebSocket(
      'ws://localhost:8000/ws/sensor_data/',
    );

    rws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);

      console.log(data);

      setMessages((prevMessages) => [...prevMessages, data.data]);
    };

    return () => {
      rws.close();
    };
  }, []);

  return (
    <div>
      <h1>Notifications:</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
