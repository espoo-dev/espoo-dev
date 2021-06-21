import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #848484;
  }

  select {
    margin-top: 10px;
    width: 100%;
    height: 36px;
    border: 1px solid #e2e2e2;
    background: #fff;
    border-radius: 5px;
    color: #000;
    padding: 0px 8px;

    ::placeholder {
      color: #e2e2e2;
    }
  }
`;
