import { Group } from '@api/models/group';
import { Flex, Text } from '@chakra-ui/react';
import { colors } from '@styles/colors';
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

  if (!groups) {
    return null;
  }

  return (
    <RoadmapContainer>
      <RoadmapRow>
        {groups && groups.length ? (
          groups.map((group) => (
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
          ))
        ) : (
          <Text color={colors.primaryTxt}>No surveys to show =/</Text>
        )}
      </RoadmapRow>
    </RoadmapContainer>
  );
};

export default RoadmapSurvey;
