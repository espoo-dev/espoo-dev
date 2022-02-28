import { AnswerSurveyStatus, Survey } from '@api/models/survey';
import { Progress } from '@chakra-ui/progress';
import { Flex } from '@chakra-ui/react';
import { Tag } from '@chakra-ui/tag';
import { MouseEventHandler, useEffect, useState } from 'react';
import { RiQuestionAnswerLine } from 'react-icons/ri';
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
  status?: AnswerSurveyStatus;
}

const StatusTagColors = {
  [AnswerSurveyStatus.NotStarted]: 'red',
  [AnswerSurveyStatus.Started]: 'yellow',
  [AnswerSurveyStatus.Completed]: 'green',
};

export const SurveyItem = (props: SurveyItemProps) => {
  const {
    title,
    description,
    numberQuestions,
    cover,
    onClick,
    loading,
    status,
  } = props;
  const [coverImage, setCoverImage] = useState<string>('');

  const imgKit = 'https://ik.imagekit.io/u7kjueyghmd/';

  const randomImage = () => {
    const images = [
      `${imgKit}/question_card_template1_tDW_SAGUh.jpg`,
      `${imgKit}/question_card_template3_otkvluVvys.jpeg`,
      `${imgKit}/question_card_template2_ku8ufHjdpCYW.jpeg`,
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    setCoverImage(cover || randomImage());
  }, []);

  const msgInSurvey = (surveyStatus: AnswerSurveyStatus) => {
    const msgs = {
      [AnswerSurveyStatus.NotStarted]: '',
      [AnswerSurveyStatus.Started]: 'Click to resume',
      [AnswerSurveyStatus.Completed]: 'Answer again!',
    };

    return msgs[surveyStatus];
  };

  return (
    <SurveyContainer data-testid={title} onClick={onClick}>
      <ImageSurvey data-testid="random-image" cover={coverImage} />
      <DetailsSurvey>
        <Flex alignItems="center" justifyContent="space-between">
          <TitleSurvey>
            <span>{title}</span>
          </TitleSurvey>
          {status ? (
            <Tag
              size="sm"
              data-testid="status-current-tag"
              colorScheme={StatusTagColors[status]}
            >
              {status}
            </Tag>
          ) : null}
        </Flex>

        <DescriptionSurvey>
          <span>{description}</span>
        </DescriptionSurvey>

        <QuestionsSurvey>
          <div>{msgInSurvey(status)}</div>
          <QuestionsSection>
            <RiQuestionAnswerLine size={20} />
            {numberQuestions > 0 ? (
              <NumberQuestions>{numberQuestions} Questions</NumberQuestions>
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
