import { Group } from '@api/models/group';
import { Flex } from '@chakra-ui/react';
import {
  IconItem,
  RoadmapContainer,
  RoadmapRow,
  SurveyItemMap,
} from './roadmap-survey.styles';

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
