import { Group } from './group';

export interface Trail {
  id: number;
  name: string;
  groups: Group[];
}
