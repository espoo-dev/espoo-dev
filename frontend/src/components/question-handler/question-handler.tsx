import React from 'react';
import { Question } from '@api/models/survey';
import { Flex, Text } from '@chakra-ui/react';
import { MultiChoice, SingleChoice } from '../questions';

interface QuestionHandlerProps {
  question: Question;
}

export const QuestionHandler = (props: QuestionHandlerProps) => {
  const { question } = props;
  const { name, options, question_type } = question;

  const getQuestionType = () => {
    switch (question_type.id) {
      case 1:
        return <SingleChoice options={options} />;
      case 2:
        return <MultiChoice options={options} />;
      default:
        return <input type="text" />;
    }
  };

  return (
    <Flex direction="column" alignItems="center" h="full" w="full">
      <Text color="white">{name}</Text>
      {getQuestionType()}
    </Flex>
  );
};
