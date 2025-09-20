import { createTheme } from '@mui/material/styles';
import { lightThemePalette, darkThemePalette } from './modes';

const getTheme = (mode) => createTheme({
  palette: mode === 'light' ? lightThemePalette : darkThemePalette,
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
});

export default getTheme;
