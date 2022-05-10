import styled from 'styled-components';

interface QuestionImageProps {
  src: string;
}

export const QuestionImage = styled.div<QuestionImageProps>`
  margin-top: 0.75rem;
  border-radius: 6px;
  max-width: 350px;
  width: 60vw;
  max-height: 300px;
  height: 50vh;
  background-image: url(${(props) => props.src}), url('/assets/logo.png');
  background-size: cover;
  background-position: center;
`;
