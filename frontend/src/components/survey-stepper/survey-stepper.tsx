import React, { useContext, useState } from 'react';
import {
  Button,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import randomId from '@utils/random-id';
import { Question } from '@api/models/survey';
import { QuestionHandler } from '../question-handler';
import { SurveyContext, SurveyContextProvider } from './survey-context';

interface SurveyStepperProps {
  questions: Question[];
}

export const SurveyStepper = (props: SurveyStepperProps) => {
  const { questions } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [allAnswered, setAllAnswered] = useState(false);
  const { answers, updateAnswers } = useContext(SurveyContext);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const next = () => {
    setTabIndex((index) => {
      if (index < questions.length - 1) {
        return index + 1;
      }

      return questions.length - 1;
    });
  };

  const previous = () => {
    setTabIndex((index) => {
      if (index > 0) {
        return index - 1;
      }

      return 0;
    });
  };

  return (
    <SurveyContextProvider>
      <Flex direction="column" color="white">
        <Tabs
          index={tabIndex}
          onChange={handleTabsChange}
          align="center"
          variant="soft-rounded"
          colorScheme="teal"
          size="sm"
        >
          <TabList>
            {questions?.map((_, index) => (
              <Tab
                color="white"
                key={randomId()}
                borderRadius="50%"
                h="20px"
                w="20px"
                p={0}
                _selected={{
                  color: 'teal.400',
                  bg: 'white',
                }}
                _notLast={{
                  marginRight: '10px',
                }}
              >
                {index + 1}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {questions?.map((question) => (
              <TabPanel key={randomId()}>
                <QuestionHandler key={question?.id} question={question} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        <Flex
          w="full"
          alignItems="center"
          justifyContent="center"
          style={{ gap: '10px' }}
        >
          <Button
            minW="100px"
            color="teal.400"
            onClick={() => previous()}
            disabled={tabIndex === 0}
          >
            previous
          </Button>
          <Button
            minW="100px"
            color="white"
            colorScheme="teal"
            bg="teal.400"
            onClick={() => next()}
            disabled={tabIndex === questions?.length - 1}
          >
            next
          </Button>
          {tabIndex === questions?.length - 1 && (
            <Button
              minW="100px"
              color="white"
              colorScheme="teal"
              bg="blue.400"
              onClick={() => next()}
              disabled={tabIndex === questions?.length}
            >
              send
            </Button>
          )}
        </Flex>
      </Flex>
    </SurveyContextProvider>
  );
};
