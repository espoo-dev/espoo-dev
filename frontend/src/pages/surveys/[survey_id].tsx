import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from 'components/sidemenu';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SurveyService } from 'api/services/survey';
import { httpClient } from 'api';
import { Survey } from 'api/models/survey';
import { HiCheck, HiCheckCircle, HiDotsVertical } from 'react-icons/hi';

const SurveyPage = () => {
  const surveyService = new SurveyService(httpClient);
  const router = useRouter();
  const { survey_id } = router.query;
  const [survey, setSurvey] = useState<Survey>(null);
  const [loading, setLoading] = useState(false);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const loadData = async (id: number) => {
    setLoading(true);
    const response = await surveyService.get(id);
    setLoading(false);

    if (response && response.data) {
      setSurvey(response.data);
    }
  };

  useEffect(() => {
    const parsedId = Number(survey_id as string);
    if (parsedId) {
      loadData(parsedId);
    }
  }, []);

  return (
    <Container>
      <Head>
        <title>{survey?.name || 'Survey'}</title>
      </Head>
      <Layout>
        <Sidemenu />
        <Content>
          <Heading as="h1" fontWeight="normal" fontSize="26px">
            {survey?.name || 'Survey'}
          </Heading>

          <Box
            background="#292929"
            height="100%"
            margin="8px 0px"
            borderRadius="3xl"
            mt="30"
            p="16px"
          >
            {loading ? (
              <Flex
                w="full"
                h="full"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner color="white" />
              </Flex>
            ) : (
              <Box h="full" w="full">
                <List spacing={3} w="full">
                  {survey?.questions.map((question, index) => (
                    <ListItem
                      color="white"
                      key={`${question.id}-${question.name}`}
                    >
                      <VStack
                        alignItems="start"
                        bg="whiteAlpha.500"
                        p="4"
                        spacing="10px"
                        w="full"
                        borderRadius="lg"
                      >
                        <Heading fontSize="md">
                          {`Question ${index + 1}`}
                        </Heading>

                        <Text color="gray.900" fontWeight="bold">
                          {question?.name}
                        </Text>

                        {question?.options && (
                          <List spacing="3" w="full">
                            {question?.options.map((option, letter) => (
                              <ListItem
                                w="full"
                                key={`${option.id}-${option.name}`}
                              >
                                <Flex gridGap="2" w="full">
                                  {/* <Flex alignItems="center">
                                    <HiDotsVertical fontSize="20px" />
                                    <Text fontSize="lg">{letters[letter]}</Text>
                                  </Flex> */}
                                  <Button
                                    bg="white"
                                    p="2"
                                    w="full"
                                    boxShadow="base"
                                    rounded="md"
                                    alignItems="center"
                                    justifyContent="space-between"
                                  >
                                    <Text color="gray.900">{option.name}</Text>
                                    <HiCheckCircle color="black" size={20} />
                                  </Button>
                                </Flex>
                              </ListItem>
                            ))}
                          </List>
                        )}
                      </VStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Content>
      </Layout>
    </Container>
  );
};

export default SurveyPage;
