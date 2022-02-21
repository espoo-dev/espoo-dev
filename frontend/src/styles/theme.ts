import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  breakpoints: {
    xs: '340px',
    sm: '480px',
    md: '768px',
    lg: '1279px',
  },
});

export default customTheme;
