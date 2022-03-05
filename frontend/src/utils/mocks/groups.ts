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
        id: 1,
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
        id: 2,
      },
      {
        name: 'Travel',
        icon: 'url',
        id: 3,
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
        id: 4,
      },
      {
        name: 'My day',
        icon: 'url',
        id: 5,
      },
    ],
    position: 3,
    status: StatusGroup.Blocked,
  },
];

export default mockManyGroups;
