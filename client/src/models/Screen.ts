export interface Screen {
  id: number;
  name: string;
  rig_id: number;
  ipv4: string;
  ipv6: string | null;
  mac_address: string;
  online: boolean;
}
