import Head from 'next/head';
import { withAuth } from 'hoc/withAuth';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from '@components/sidemenu';
import {
  Box,
  Heading,
  Spinner,
  Text,
  Flex,
  Button,
  Tooltip,
  Spacer,
} from '@chakra-ui/react';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { useEffect, useState } from 'react';
import { SurveysList } from '@components/main/SurveysList';
import { SurveyService } from 'api/services/survey';
import { Survey } from 'api/models/survey';
import { HiRefresh } from 'react-icons/hi';
import SurveyPage from '../survey';

const Surveys = () => {
  const surveyService = new SurveyService(httpClient);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);
  const [surveySelected, setSurveySelected] = useState<Survey>(null);

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
          <Heading as="h1" fontWeight="normal" fontSize="26px">
            {surveySelected ? surveySelected.name : 'Surveys'}
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
              <Spinner color="white" />
            ) : (
              !surveySelected && (
                <Flex alignItems="center">
                  <Text color="white" textAlign="center" mb="10px">
                    {surveys.length
                      ? 'Discover a new survey!'
                      : 'No surveys =/'}
                  </Text>
                  <Spacer />
                  <Tooltip label="Refresh" placement="top">
                    <Button
                      rounded="lg"
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
              <SurveyPage survey={surveySelected} />
            ) : (
              <SurveysList
                data={surveys}
                setSurveySelected={setSurveySelected}
              />
            )}
          </Box>

          {/* Paggination buttons */}
          {/* <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box
              background="#292929"
              alignItems="center"
              padding="10px"
              margin="2px"
              color="#fff"
              borderRadius="8px"
            >
              <HiArrowLeft />
            </Box>
            <Box
              background="#292929"
              alignItems="center"
              padding="10px"
              margin="2px"
              color="#fff"
              borderRadius="8px"
            >
              <HiArrowRight />
            </Box>
          </Box> */}
        </Content>
      </Layout>
    </Container>
  );
};

export default withAuth(Surveys);
