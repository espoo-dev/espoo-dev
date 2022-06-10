import { Survey } from './survey';

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
  surveys: Survey[];
  position: number;
  status: StatusGroup;
}
