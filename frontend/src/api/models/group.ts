export enum StatusGroup {
  Available = 'Available',
  Completed = 'Completed',
  Doing = 'Doing',
  Blocked = 'Blocked',
}

export interface Group {
  id: number;
  name: string;
  required_groups_ids: number[];
  surveys: {
    name: string;
    icon: string;
    id: number;
    icon_url?: string;
  }[];
  position: number;
  status: StatusGroup;
}
