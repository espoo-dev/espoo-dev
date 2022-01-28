import styled from 'styled-components';

export const SurveysListContainer = styled.div`
  display: grid;
  gap: 4;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;
