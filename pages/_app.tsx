import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { AppProps } from "next/app";

const THEME = createTheme({
  typography: {
    fontFamily: `"Kanit", sans-serif`,
    fontSize: 16,
    fontWeightRegular: 1000,
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FF2828",
      dark: "#ffebee",
      contrastText: "#000",
    },
    info: {
      light: "#FFEBEE",
      main: "#FFFFFF",
      dark: "#ffebee",
      contrastText: "#000",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
