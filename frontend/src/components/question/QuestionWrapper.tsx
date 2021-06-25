import React from 'react';
import { Question } from 'api/models/survey';
import { SingleChoice } from './SingleChoice';

export const QuestionWrapper = (data: Question) => {
  const { name, options, question_type } = data;

  switch (question_type.id) {
    case 1:
      return (
        <div>
          <SingleChoice />
        </div>
      );
    default:
      return <input type="text" />;
  }
};
