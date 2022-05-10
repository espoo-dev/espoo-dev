import { StatusGroup } from '@api/models/group';
import styled from 'styled-components';

interface IconItemProps {
  status: StatusGroup;
  icon_url: string;
}

const getAvailableColor = (status: StatusGroup): string => {
  const color = (status === StatusGroup.Blocked && 'gray') || 'green';
  return color;
};

export const SurveyItemMap = styled.div<{ status: StatusGroup }>`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 600;
    margin-top: 5px;
    color: ${(props) => getAvailableColor(props.status)};
  }
`;

export const IconItem = styled.div<IconItemProps>`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-image: url(${(props) => props.icon_url}),
    url('/assets/default_survey_icon.png');
  background-size: cover;
  background-position: center;
  border: ${(props) => `4px solid ${getAvailableColor(props.status)}`};
`;

export const RoadmapContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export const RoadmapRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
