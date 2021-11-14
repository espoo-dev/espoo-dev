import React, { useState } from 'react';
import { Box, Button, List, ListItem, Text } from '@chakra-ui/react';
import { HiDocumentText } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Survey } from 'api/models/survey';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { AnswerSurveyService } from 'api/services/answer_survey';
import { SurveyItem } from '@components/survey-item/survey-item';

interface SurveyListProps {
  data: Survey[];
}

export const SurveysList = (props: SurveyListProps) => {
  const { data } = props;

  const answerSurveyService = new AnswerSurveyService(httpClient);
  const [loading, setLoading] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  const registerAnswerSurvey = async (survey_id) => {
    setSelectedSurvey(survey_id);
    setLoading(true);
    try {
      const response = await answerSurveyService.register({ survey_id });
      if (response && response.data) {
        toast('Answer Survey created successfully', {
          position: 'top-right',
          type: 'success',
          pauseOnHover: false,
        });
      }
    } catch (error) {
      errorHandler(error);
    }

    setLoading(false);
  };

  return (
    <List mt="10" maxH="490px" overflow="auto">
      {data.map((item) => (
        <ListItem key={item.id} mb="8">
          <Box
            display={{ md: 'flex', lg: 'flex' }}
            color="#fff"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <HiDocumentText size={40} />
              <Box ml="10px">
                <Text fontWeight="bold">{item.name}</Text>
                <Text>
                  {item.questions.length}
                  &nbsp;questions
                </Text>
              </Box>
            </Box>

            <Button
              isLoading={loading && selectedSurvey === item.id}
              colorScheme="teal"
              size="sm"
              mt={{ sm: '10px' }}
              onClick={() => registerAnswerSurvey(item.id)}
              data-testid={item.name}
            >
              Start
            </Button>
          </Box>
        </ListItem>
      ))}
      <SurveyItem description="description" title="title" />
    </List>
  );
};
