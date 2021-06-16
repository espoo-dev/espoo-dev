import Head from 'next/head';
import { withAuth } from 'hoc/withAuth';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from 'components/sidemenu';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { SurveysList } from 'components/main/SurveysList';
import { SurveyService } from 'api/services/survey';
import { Survey } from 'api/models/survey';

const Surveys = () => {
  const surveyService = new SurveyService(httpClient);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(false);

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
            Surveys
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
              <Text color="white" textAlign="center" mb="10px">
                {surveys.length ? 'Discover a new survey!' : 'No surveys =/'}
              </Text>
            )}

            <SurveysList data={surveys} />
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
