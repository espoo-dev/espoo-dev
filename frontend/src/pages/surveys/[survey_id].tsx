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
  List,
  ListItem,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SurveyService } from 'api/services/survey';
import { httpClient } from 'api';
import { Survey } from 'api/models/survey';
import { HiCheckCircle } from 'react-icons/hi';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { AUTH_COOKIE } from 'consts';
import { QuestionHandler } from '@/components/question';

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
                    <QuestionHandler key={question.id} question={question} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  const { [AUTH_COOKIE]: token } = parseCookies(ctx);

  console.log('token :>> ', token);
  console.log('query :>> ', query);

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
