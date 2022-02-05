import { Flex } from '@chakra-ui/react';
import {
  IconItem,
  RoadmapContainer,
  RoadmapRow,
  SurveyItemMap,
} from './roadmap-survey.styles';

export enum StatusGroup {
  Available = 'Available',
  Doing = 'Doing',
  Blocked = 'Blocked',
}

export interface Group {
  id: number;
  name: string;
  group_dependencies_ids: number[];
  surveys: {
    name: string;
    icon: string;
  }[];
  position: number;
  status: StatusGroup;
}

interface RoadmapSurveyProps {
  groups: Group[];
}

const RoadmapSurvey = (props: RoadmapSurveyProps) => {
  const { groups } = props;

  return (
    <RoadmapContainer>
      <RoadmapRow>
        {groups.map((group) => (
          <Flex key={group.id} data-testid={`group-${group.id}`}>
            {group.surveys.map((survey) => (
              <SurveyItemMap status={group.status} key={survey.name}>
                <IconItem
                  data-testid={`icon-${survey.name}`}
                  status={group.status}
                />
                <span>{survey.name}</span>
              </SurveyItemMap>
            ))}
          </Flex>
        ))}
      </RoadmapRow>
    </RoadmapContainer>
  );
};

export default RoadmapSurvey;
