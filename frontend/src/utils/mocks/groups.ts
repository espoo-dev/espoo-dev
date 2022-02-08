import { Group, StatusGroup } from '@api/models/group';

const mockManyGroups: Group[] = [
  {
    id: 1,
    name: 'Introduction',
    required_groups_ids: [],
    surveys: [
      {
        name: 'Introduction',
        icon: 'url',
      },
    ],
    position: 1,
    status: StatusGroup.Available,
  },
  {
    id: 2,
    name: 'Basic1',
    required_groups_ids: [1],
    surveys: [
      {
        name: 'Regards',
        icon: 'url',
      },
      {
        name: 'Travel',
        icon: 'url',
      },
    ],
    position: 2,
    status: StatusGroup.Doing,
  },
  {
    id: 3,
    name: 'Simple Present',
    required_groups_ids: [2],
    surveys: [
      {
        name: 'Store',
        icon: 'url',
      },
      {
        name: 'My day',
        icon: 'url',
      },
    ],
    position: 3,
    status: StatusGroup.Blocked,
  },
];

export default mockManyGroups;
