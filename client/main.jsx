import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './components/App';
import daw from './app';

const root = createRoot(document.getElementById('root'));

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

daw.load().then(() => {
  root.render(
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box>
        <App daw={daw} />
      </Box>
    </ThemeProvider>
  );
});
