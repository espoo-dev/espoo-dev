import { httpClient } from '@api/client';
import { SurveyService } from '@api/services/survey';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

const Member = ({ user }) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return <p>Loading...</p>;
  }

  return <h1>user: {user.name} -</h1>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;

  // const response = await fetch(`https://api.github.com/users/${id}`);
  // // const data = await response.json();
  const surveyService = new SurveyService(httpClient);
  const survey = await surveyService.get(Number(id));
  const data = await survey.data;
  console.log(data);

  return {
    props: {
      user: data,
    },
  };
};

export default Member;
