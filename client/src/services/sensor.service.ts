import axios from 'axios';

import { Sensor } from '@/models/Sensor';

class SensorDataService {
  URL = 'http://localhost:8000/api/sensors';

  async get() {
    const { data } = await axios.get<Sensor[]>(this.URL, {
      withCredentials: true,
    });

    return data;
  }

  async getByRigId(id: number) {
    const { data } = await axios.get<Sensor[]>(this.URL + '/?rig_id=' + id, {
      withCredentials: true,
    });

    console.log(this.URL + '/?rig_id=' + id);

    return data;
  }
}

export const sensorDataService = new SensorDataService();
