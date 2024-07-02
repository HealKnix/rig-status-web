import axios from 'axios';

import { Rig } from '@/models/Rig';

class RigService {
  async get() {
    const { data } = await axios.get<Rig[]>('/api/rigs', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }

  async getById(id: number) {
    const { data } = await axios.get<Rig>(`/api/rigs/${id}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return data;
  }
}

export const rigService = new RigService();
