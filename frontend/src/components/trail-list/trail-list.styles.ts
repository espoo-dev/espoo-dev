import { colors } from '@styles/colors';
import styled from 'styled-components';

export const TrailListContainer = styled.div`
  display: grid;
  gap: 4px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const TrailListItem = styled.div`
  background-color: #222;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  color: ${colors.primaryTxt};
`;

export const TrailTitle = styled.span`
  font-weight: bold;
  padding-bottom: 8px;
`;
