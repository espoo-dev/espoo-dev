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
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e1e1;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
`;

export const TrailTitle = styled.span`
  font-weight: bold;
  padding-bottom: 8px;
`;
