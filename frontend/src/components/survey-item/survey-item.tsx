import { DescriptionSurvey, DetailsSurvey, ImageSurvey, NumberQuestions, QuestionsSurvey, SurveyContainer, TitleSurvey } from "./survey-item.style"
import { RiQuestionAnswerLine } from 'react-icons/ri';

export interface SurveyItemProps {
  title: string;
  description: string;
  numberQuestions?: number;
};

export const SurveyItem = (props: SurveyItemProps) => {
  const { title, description, numberQuestions } = props;
  
  const randomImage = () => {
    const images = [
      'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?cs=srgb&dl=pexels-startup-stock-photos-7103.jpg&fm=jpg',
      'https://images.pexels.com/photos/1326947/pexels-photo-1326947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/351961/pexels-photo-351961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
    ]
    return images[Math.floor(Math.random() * images.length)]
  };

  return (
    <SurveyContainer>
      <ImageSurvey data-testid="random-image" cover={randomImage()} />
      <DetailsSurvey>
        <TitleSurvey>
          <span>{title}</span>
        </TitleSurvey>
        <DescriptionSurvey>
          <span>{description}</span>
        </DescriptionSurvey> 
        <QuestionsSurvey>
          <RiQuestionAnswerLine size={20} />
          { numberQuestions > 0 ? 
            <NumberQuestions>{numberQuestions}</NumberQuestions> :
            <NumberQuestions>No questions</NumberQuestions>
          }
        </QuestionsSurvey> 
      </DetailsSurvey>
    </SurveyContainer>
  )
}
