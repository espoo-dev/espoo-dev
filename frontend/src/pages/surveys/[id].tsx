import { Container, Content, Layout } from 'styles/main.styles';
import { Box, Button, Heading, Spinner, Tooltip } from '@chakra-ui/react';
import Head from 'next/head';
import { Sidemenu } from '@components/sidemenu';
import { useRouter } from 'next/router';
import { SurveyService } from '@api/services/survey';
import { httpClient } from '@api/client';
import { useEffect, useState } from 'react';
import { Survey } from 'api/models/survey';
import { GetServerSideProps } from 'next';
import { AUTH_COOKIE } from 'consts';
import { parseCookies } from 'nookies';
import { HiArrowLeft } from 'react-icons/hi';
import { SurveyHandler } from '@components/survey-handler';

const surveyService = new SurveyService(httpClient);

const SurveyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [survey, setSurvey] = useState<Survey>();
  const [loading, setLoading] = useState(false);

  const loadSurvey = async () => {
    setLoading(true);
    const response = await surveyService.get(Number(id));
    setSurvey(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadSurvey();
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
            {survey ? survey.name : <Spinner color="white" />}
          </Heading>

          <Box
            background="#f5f7fb"
            height="100%"
            borderRadius="3xl"
            mt="30"
            p="16px"
          >
            {survey && !loading && (
              <Box>
                <Tooltip label="Back to list" placement="top">
                  <Button
                    rounded="lg"
                    p={0}
                    bg="teal.400"
                    colorScheme="teal"
                    w="30px"
                    onClick={() => router.push('/surveys')}
                  >
                    <HiArrowLeft color="white" />
                  </Button>
                </Tooltip>
                <SurveyHandler survey={survey} />
              </Box>
            )}
          </Box>
        </Content>
      </Layout>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [AUTH_COOKIE]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default SurveyPage;
