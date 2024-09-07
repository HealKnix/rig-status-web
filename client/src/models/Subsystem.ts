export interface Subsystem {
  id: number;
  rig_id: number;
  name: string;
  description: string | null;
  active: boolean;
}
