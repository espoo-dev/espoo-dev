import { ChakraProvider, theme } from '@chakra-ui/react';
import { render } from '@testing-library/react';

const Providers = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
