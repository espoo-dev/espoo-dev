import React from 'react';
import { Question } from 'api/models/survey';
import { SingleChoice } from './SingleChoice';
import { MultiChoice } from './MultiChoice';

interface QuestionHandlerProps {
  question: Question;
}

export const QuestionHandler = (props: QuestionHandlerProps) => {
  const { question } = props;
  const { name, options, question_type } = question;

  switch (question_type.id) {
    case 1:
      return <SingleChoice options={options} />;
    case 25:
      return <MultiChoice name={name} options={options} />;
    default:
      return <input type="text" />;
  }
};
