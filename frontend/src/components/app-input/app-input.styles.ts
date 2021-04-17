import styled from 'styled-components';
import { labelMargin } from 'styles/spacings';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: bold;
    margin: 0 0 ${labelMargin} ${labelMargin};
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    padding: 8px 12px;
    color: #000;

    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
`;
