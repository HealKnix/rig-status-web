import axios from 'axios';

import { Sensor } from '@/models/Sensor';

class SensorDataService {
  async get() {
    const { data } = await axios.get<Sensor[]>('/api/sensors', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }

  async getByRigId(id: number) {
    const { data } = await axios.get<Sensor[]>('/api/sensors/?rig_id=' + id, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }
}

export const sensorDataService = new SensorDataService();
