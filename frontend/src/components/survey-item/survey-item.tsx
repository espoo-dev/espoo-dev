import { RiQuestionAnswerLine } from 'react-icons/ri';
import { MouseEventHandler, useEffect, useState } from 'react';
import { Progress } from '@chakra-ui/progress';
import { Survey } from '@api/models/survey';
import {
  DescriptionSurvey,
  DetailsSurvey,
  ImageSurvey,
  NumberQuestions,
  QuestionsSection,
  QuestionsSurvey,
  SurveyContainer,
  TitleSurvey,
} from './survey-item.style';

export interface SurveyItemProps {
  title: string;
  description: string;
  numberQuestions?: number;
  cover?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  loading?: boolean;
  surveyData?: Survey;
}

export const SurveyItem = (props: SurveyItemProps) => {
  const {
    title,
    description,
    numberQuestions,
    cover,
    onClick,
    loading,
    surveyData,
  } = props;
  const [coverImage, setCoverImage] = useState<string>('');

  const randomImage = () => {
    const images = [
      'https://images.pexels.com/photos/7103/writing-' +
        'notes-idea-conference.jpg?cs=srgb&dl=' +
        'pexels-startup-stock-photos-7103.jpg&fm=jpg',
      'https://images.pexels.com/photos/1326947/' +
        'pexels-photo-1326947.jpeg?auto=compress' +
        's&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/351961/' +
        'pexels-photo-351961.jpeg?auto=compress' +
        '&cs=tinysrgb&dpr=2&h=650&w=940',
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    setCoverImage(cover || randomImage());
  }, []);

  return (
    <SurveyContainer data-testid={title} onClick={onClick}>
      <ImageSurvey data-testid="random-image" cover={coverImage} />
      <DetailsSurvey>
        <TitleSurvey>
          <span>{title}</span>
        </TitleSurvey>
        <DescriptionSurvey>
          <span>{description}</span>
        </DescriptionSurvey>
        <QuestionsSurvey>
          <span>
            {surveyData?.answers_surveys.length ? 'Click to resume' : ''}
          </span>
          <QuestionsSection>
            <RiQuestionAnswerLine size={20} />
            {numberQuestions > 0 ? (
              <NumberQuestions>
                {numberQuestions}
                {' '}
                Questions
              </NumberQuestions>
            ) : (
              <NumberQuestions>No questions</NumberQuestions>
            )}
          </QuestionsSection>
        </QuestionsSurvey>
        {loading && <Progress size="xs" isIndeterminate mt="2" />}
      </DetailsSurvey>
    </SurveyContainer>
  );
};
