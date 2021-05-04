import Head from 'next/head';
import { withAuth } from 'hoc/withAuth';
import { Container, Content, Layout } from 'styles/main.styles';
import { Sidemenu } from 'components/sidemenu';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { UserService } from 'api/services/user';
import { httpClient } from 'api';
import { errorHandler } from 'api/error-handler';
import { useEffect, useState } from 'react';
import { User } from 'api/models/user';
import { TeacherDetails } from 'components/main/TeacherDetails';
import { TeachersList } from 'components/main/TeachersList';

const Main = () => {
  const userService = new UserService(httpClient);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<User>(null);

  const listUsers = async () => {
    try {
      const response = await userService.list({ role_id: 1 });
      if (response && response.data) {
        setTeachers(response.data);
      }
    } catch (error) {
      setTeachers([]);
      errorHandler(error);
    }
  };

  const selectTeacher = (user: User) => {
    setSelectedTeacher(user);
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <Container>
      <Head>
        <title>Espoolingo - Home</title>
      </Head>
      <Layout>
        <Sidemenu />
        <Content>
          <h1>Teachers</h1>

          <Grid
            mt="30px"
            templateColumns="250px auto"
            gap="30px"
            w="full"
            h="full"
          >
            <GridItem
              as={Box}
              bg="whiteAlpha.400"
              w="full"
              h="full"
              borderRadius="3xl"
              p={4}
            >
              {selectedTeacher ? (
                <TeacherDetails data={selectedTeacher} />
              ) : (
                <Text color="white" textAlign="center">
                  Select a teacher in the list below to see his detais
                </Text>
              )}

              <TeachersList data={teachers} onSelect={selectTeacher} />
            </GridItem>

            <GridItem>
              <Grid templateRows="150px auto" gap="30px" h="full">
                <GridItem
                  as={Flex}
                  flexDirection="column"
                  bg="teal.400"
                  borderRadius="3xl"
                  p={4}
                  justifyContent="center"
                >
                  <Heading fontSize="26px" color="white">
                    About
                  </Heading>
                  <Text color="white">
                    Choose a teacher and start one of his surveys
                  </Text>
                </GridItem>

                <GridItem
                  as={Flex}
                  bg="whiteAlpha.400"
                  w="full"
                  h="full"
                  borderRadius="3xl"
                  p={4}
                >
                  <Heading fontSize="26px" color="white">
                    Surveys
                  </Heading>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Content>
      </Layout>
    </Container>
  );
};

export default withAuth(Main);
