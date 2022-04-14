import { Container, Content, DarkContainer, Layout } from 'styles/main.styles';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { Sidemenu } from '@components/sidemenu';
import { useRouter } from 'next/router';
import { httpClient } from '@api/client';
import { Trail } from '@api/models/trail';
import { TrailService } from '@api/services/trail';

import { AppButton } from '@components/app-button';
import { RoadmapSurvey } from '@components/roadmap-survey/roadmap-survey';

import { colors } from '@styles/colors';
import { colorPallettes } from '@styles/globals';
import { AUTH_COOKIE } from 'consts';
import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

const trailService = new TrailService(httpClient);

const TrailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [trail, setTrail] = useState<Trail>();
  const [loading, setLoading] = useState(false);

  const loadTrail = async () => {
    setLoading(true);
    try {
      const response = await trailService.get(Number(id));
      setTrail(response.data);
    } catch (error) {
      redirectToList();
    } finally {
      setLoading(false);
    }
  };

  const redirectToList = () => {
    toast('Trail invalid', {
      position: 'top-right',
      type: 'warning',
      pauseOnHover: false,
    });
    router.replace('/trails');
  };

  useEffect(() => {
    if (Number.isNaN(Number(id))) {
      redirectToList();
      return;
    }
    loadTrail();
  }, []);

  return (
    <Container>
      <Head>
        <title>Espoolingo - Trail</title>
      </Head>
      <Layout>
        <Sidemenu />
        <Content>
          <Heading
            as="h1"
            fontWeight="normal"
            fontSize="26px"
            color={colors.primaryTxt}
          >
            {loading ? <Spinner color="white" /> : trail && trail.name}
          </Heading>

          <DarkContainer>
            {trail && !loading && (
              <Box>
                <AppButton
                  tooltip="Back to list"
                  icon={<HiArrowLeft />}
                  onClick={() => router.push('/trails')}
                />
                {trail.groups && (
                  <Box
                    mt={3}
                    textAlign="center"
                    color={colorPallettes.secondary}
                  >
                    <span style={{ color: '#3cbfb9' }}>
                      SELECT A SURVEY TO ANSWER
                    </span>
                    <RoadmapSurvey groups={trail.groups} />
                  </Box>
                )}
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

export default TrailPage;
