import React from 'react';
import { Box, Button, List, ListItem, Text } from '@chakra-ui/react';
import { HiDocumentText } from 'react-icons/hi';
import { Survey } from 'api/models/survey';
import { useRouter } from 'next/router';

interface SurveyListProps {
  data: Survey[];
}

export const SurveysList = (props: SurveyListProps) => {
  const router = useRouter();

  const { data } = props;

  const goToSurvey = (id: number) => {
    router.push(`/surveys/${id}`);
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
              colorScheme="teal"
              size="sm"
              mt={{ sm: '10px' }}
              onClick={() => goToSurvey(item.id)}
            >
              Start
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};
