import { DrillingStatusId } from './DrillingStatus';
import { TechStatusId } from './TechStatus';

export interface Rig {
  id: number;
  name: string;
  location: string;
  well_depth: number;
  bottom_hole_drilling: number;
  connection_speed: number;
  tech_date: Date;
  drilling_status_id: DrillingStatusId;
  tech_status_id: TechStatusId;
}
