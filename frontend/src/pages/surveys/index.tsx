import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { SurveysList } from '@components/main/SurveysList';
import { Sidemenu } from '@components/sidemenu';
import { SurveyHandler } from '@components/survey-handler';
import { colors } from '@styles/colors';
import {
  Container,
  Content,
  DarkContainer,
  Layout,
  SurveyListWrapper,
} from '@styles/main.styles';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { Survey } from 'api/models/survey';
import { SurveyService } from 'api/services/survey';
import { withAuth } from 'hoc/withAuth';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiRefresh } from 'react-icons/hi';

const Surveys = () => {
  const surveyService = new SurveyService(httpClient);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);
  const [surveySelected, setSurveySelected] = useState<Survey>(null);

  const backToList = () => {
    listSurveys();
    setSurveySelected(null);
  };

  const listSurveys = async () => {
    setLoading(true);
    try {
      const response = await surveyService.list();
      if (response && response.data) {
        setLoading(false);
        setSurveys(response.data);
      }
    } catch (error) {
      setLoading(false);
      setSurveys([]);
      errorHandler(error);
    }
  };

  useEffect(() => {
    listSurveys();
  }, []);

  return (
    <Container>
      <Head>
        <title>Espoolingo - Surveys</title>
      </Head>
      <Layout>
        <Sidemenu />
        <Content>
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize="20px"
            color={colors.primaryTxt}
            ml={{
              base: 0,
              md: 0,
              sm: '20px',
              xs: '20px',
            }}
          >
            {surveySelected ? surveySelected.name : 'Surveys'}
          </Heading>

          <DarkContainer>
            {loading ? (
              <Spinner color={colors.primaryTxt} />
            ) : (
              !surveySelected && (
                <Flex
                  py="10px"
                  alignItems="center"
                  justifyContent="space-between"
                  mb="1em"
                >
                  <Text
                    color={colors.primaryTxt}
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {surveys.length
                      ? 'Discover a new survey!'
                      : 'No surveys =/'}
                  </Text>

                  <Tooltip label="Refresh" placement="top">
                    <Button
                      rounded="lg"
                      data-testid="refresh-survey-lit"
                      p={0}
                      bg="teal.400"
                      colorScheme="teal"
                      w="30px"
                      onClick={listSurveys}
                    >
                      <HiRefresh color="white" />
                    </Button>
                  </Tooltip>
                </Flex>
              )
            )}

            {surveySelected ? (
              <Box>
                <Tooltip label="Back to list" placement="top">
                  <Button
                    rounded="lg"
                    p={0}
                    bg="teal.400"
                    colorScheme="teal"
                    w="30px"
                    onClick={backToList}
                  >
                    <HiArrowLeft color="white" />
                  </Button>
                </Tooltip>
                <SurveyHandler survey={surveySelected} />
              </Box>
            ) : (
              !loading && (
                <SurveyListWrapper>
                  <SurveysList
                    data={surveys}
                    setSurveySelected={setSurveySelected}
                  />
                </SurveyListWrapper>
              )
            )}
          </DarkContainer>
        </Content>
      </Layout>
    </Container>
  );
};

export default withAuth(Surveys);
