import styled from 'styled-components';
import { MdSync } from 'react-icons/md';
import { Button } from '@styles/utils';

export const StyledAppButton = styled(Button)`
  .text {
    margin: 0 5px;
  }
  width: 100%;
  height: 36px;
  font-weight: normal;
`;

export const LoadingIcon = styled(MdSync)`
  animation: spin 1s linear infinite;
  margin-right: 10px;
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
