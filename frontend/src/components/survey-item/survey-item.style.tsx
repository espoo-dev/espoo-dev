import styled from 'styled-components';

export const SurveyContainer = styled.div`
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
`;

export const ImageSurvey = styled.div<{ cover: string }>`
  height: 100px;
  background-image: url(${(props) => props.cover});
  background-size: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  transition: 300ms;

  &:hover {
    opacity: 0.7;
    transition: 300ms;
  }
`;

export const DetailsSurvey = styled.div`
  padding: 10px;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export const TitleSurvey = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

export const DescriptionSurvey = styled.div`
  font-size: 12px;
  padding-top: 4px;
`;

export const QuestionsSurvey = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #747474;
  padding-top: 12px;
  justify-content: space-between;
`;

export const NumberQuestions = styled.div`
  padding-left: 6px;
`;

export const QuestionsSection = styled.div`
  display: flex;
  align-items: center;
`;
