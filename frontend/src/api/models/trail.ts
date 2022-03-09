import { Group } from './group';

export interface Trail {
  id: number;
  name: string;
  surveys_quantity: number;
  groups?: Group[];
}
