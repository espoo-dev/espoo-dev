import { Trail } from '@api/models/trail';
import { TrailService } from '@api/services/trail';
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import RoadmapSurvey from '@components/roadmap-survey/roadmap-survey';
import { Sidemenu } from '@components/sidemenu';
import { SurveyHandler } from '@components/survey-handler';
import { colorPallettes } from '@styles/globals';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { Survey } from 'api/models/survey';
import { withAuth } from 'hoc/withAuth';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { HiArrowLeft, HiRefresh } from 'react-icons/hi';
import { Container, Content, Layout } from 'styles/main.styles';

const Trails = () => {
  const trailService = new TrailService(httpClient);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [loading, setLoading] = useState(false);
  const [surveySelected, setSurveySelected] = useState<Survey>(null);

  const backToList = () => {
    loadTrails();
    setSurveySelected(null);
  };

  const loadTrails = async () => {
    setLoading(true);
    try {
      const response = await trailService.list();
      if (response && response.data) {
        setLoading(false);
        setTrails(response.data);
      }
    } catch (error) {
      setLoading(false);
      setTrails([]);
      errorHandler(error);
    }
  };

  useEffect(() => {
    loadTrails();
  }, []);

  return (
    <Container>
      <Head>
        <title>Espoolingo - Trails</title>
      </Head>
      <Layout>
        <Sidemenu />
        <Content>
          <Heading as="h1" fontWeight="normal" fontSize="26px">
            {surveySelected ? surveySelected.name : 'Trails'}
          </Heading>

          <Box
            background="#f5f7fb"
            height="100%"
            borderRadius="3xl"
            mt="30"
            p="16px"
          >
            {loading ? (
              <Spinner color={colorPallettes.primary} />
            ) : (
              !surveySelected && (
                <Flex padding="10px" alignItems="center">
                  <Text
                    color={colorPallettes.primary}
                    textAlign="center"
                    mb="10px"
                  >
                    {trails.length ? 'Discover a trail!' : 'No trails =/'}
                  </Text>
                  <Spacer />
                  <Tooltip label="Refresh" placement="top">
                    <Button
                      rounded="lg"
                      p={0}
                      bg="teal.400"
                      colorScheme="teal"
                      w="30px"
                      onClick={loadTrails}
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
              !loading &&
              trails.length && <RoadmapSurvey groups={trails[0].groups} />
            )}
          </Box>
        </Content>
      </Layout>
    </Container>
  );
};

export default withAuth(Trails);
