import { Group, StatusGroup } from '@api/models/group';
import mockSurvey from './survey';

const mockManyGroups: Group[] = [
  {
    id: 1,
    name: 'Introduction',
    required_groups_ids: [],
    surveys: [
      { ...mockSurvey, name: 'Introduction', id: 1 },
    ],
    position: 1,
    status: StatusGroup.Available,
  },
  {
    id: 2,
    name: 'Basic1',
    required_groups_ids: [1],
    surveys: [
      { ...mockSurvey, name: 'Regards', id: 2 },
      { ...mockSurvey, name: 'Travel', id: 3 }
    ],
    position: 2,
    status: StatusGroup.Doing,
  },
  {
    id: 3,
    name: 'Simple Present',
    required_groups_ids: [2],
    surveys: [
      { ...mockSurvey, name: 'Store', id: 4 },
      { ...mockSurvey, name: 'My day', id: 6 },
    ],
    position: 3,
    status: StatusGroup.Blocked,
  },
];

export default mockManyGroups;
