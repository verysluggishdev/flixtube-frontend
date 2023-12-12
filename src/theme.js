// theme.js or theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    light: {
      text: '#333',
      background: '#fff',
      primary: '#3498db',
    },
    dark: {
      text: '#fff',
      background: '#222',
      primary: '#2ecc71',
    },
  },
});

export default theme;
