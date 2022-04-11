import { httpClient } from '@api/client';
import { SurveyService } from '@api/services/survey';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import { AppButton } from '@components/app-button';
import { Sidemenu } from '@components/sidemenu';
import { SurveyHandler } from '@components/survey-handler';
import { colors } from '@styles/colors';
import { Container, Content, DarkContainer, Layout } from '@styles/main.styles';
import { Survey } from 'api/models/survey';
import { AUTH_COOKIE } from 'consts';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

const surveyService = new SurveyService(httpClient);

const SurveyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [survey, setSurvey] = useState<Survey>();
  const [loading, setLoading] = useState(false);

  const loadSurvey = async () => {
    setLoading(true);
    try {
      const response = await surveyService.get(Number(id));
      setSurvey(response.data);
    } catch (error) {
      redirectToList();
    } finally {
      setLoading(false);
    }
  };

  const redirectToList = () => {
    toast('Survey invalid', {
      position: 'top-right',
      type: 'warning',
      pauseOnHover: false,
    });
    router.replace('/surveys');
  };

  useEffect(() => {
    if (Number.isNaN(Number(id))) {
      redirectToList();
      return;
    }
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
          <Heading
            color={colors.primaryTxt}
            as="h1"
            fontWeight="normal"
            fontSize="26px"
          >
            {loading ? <Spinner color="white" /> : survey && survey.name}
          </Heading>

          <DarkContainer>
            {survey && !loading && (
              <Box>
                <AppButton
                  tooltip="Back to list"
                  icon={<HiArrowLeft />}
                  onClick={() => router.push('/surveys')}
                />
                <SurveyHandler survey={survey} />
              </Box>
            )}
          </DarkContainer>
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
