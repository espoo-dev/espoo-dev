import Head from 'next/head';
import { withAuth } from 'hoc/withAuth';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from 'components/sidemenu';
import { Box, Heading, Text } from '@chakra-ui/react';
import { UserService } from 'api/services/user';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { useEffect, useState } from 'react';
import { User } from 'api/models/user';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import { SurveysList } from 'components/main/SurveysList';
import { SurveyService } from 'api/services/survey';
import { Survey } from 'api/models/survey';

const Surveys = () => {
  const surveyService = new SurveyService(httpClient);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<User>(null);

  const listUsers = async () => {
    try {
      const response = await surveyService.list();
      if (response && response.data) {
        setSurveys(response.data);
      }
    } catch (error) {
      setSurveys([]);
      errorHandler(error);
    }
  };

  const selectTeacher = (user: User) => {
    setSelectedTeacher(user);
  };

  const unselectTeacher = () => {
    setSelectedTeacher(null);
  };

  useEffect(() => {
    listUsers();
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
            <Text color="white" textAlign="center" mb="10px">
              Discover a new survey!
            </Text>

            <SurveysList data={surveys} />
          </Box>

          <Box
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
          </Box>

          {/* <Grid
            mt="30px"
            templateColumns="full auto"
            gap="30px"
            w="full"
            h="full"
          >
            <GridItem
              as={Box}
              bg="#292929"
              w="full"
              h="full"
              borderRadius="3xl"
              p={4}
              rowSpan={6}
            >
              <Box
                height="100%"
                overflow="auto"
              >
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
                <Text color="white" textAlign="center" mb="10px">
                  Discover a new survey!
                </Text>
              </Box>
            </GridItem>

            <GridItem
              bg="red"
              rowSpan={1}
            >
              <Flex
                justifyContent="flex-end"
                padding="0px 10px"
              >
                <span>A</span>
              </Flex>
            </GridItem>

          </Grid> */}
        </Content>
      </Layout>
    </Container>
  );
};

export default withAuth(Surveys);
