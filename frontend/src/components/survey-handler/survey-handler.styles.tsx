import styled from 'styled-components';

export const QuestionImage = styled.div<{ src: string }>`
  margin-top: 0.75rem;
  border-radius: 6px;
  width: 300px;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
