export interface Sensor {
  id: number;
  rig_id: number;
  subsystem_id: number;
  name: string;
  data_type: string;
  unit: string | null;
  status_id: number;
  min_value: number;
  max_value: number;
  output_type_id: number;
}
