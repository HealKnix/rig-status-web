import { SensorOutputTypeId } from './SensorOutputType';
import { SensorStatusId } from './SensorStatus';

export interface Sensor {
  id: number;
  rig_id: number;
  subsystem_id: number;
  name: string;
  data_type: string;
  unit: string | null;
  status_id: SensorStatusId;
  min_value: number;
  max_value: number;
  output_type_id: SensorOutputTypeId;
}
