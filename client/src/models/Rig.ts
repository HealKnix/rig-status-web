import { DrillingStatusId } from './DrillingStatus';
import { TechStatusId } from './TechStatus';

export interface Rig {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  well_pad_id: number;
  well_type_id: number;
  well_number: number;
  well_depth: number;
  bottom_hole_drilling: number;
  connection_speed: number;
  drilling_status_id: DrillingStatusId;
  tech_status_id: TechStatusId;
  start_date: Date;
  end_date_fact: Date | null;
  end_date_plan: Date;
  tech_date: Date | null;
}
