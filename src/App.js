import "./App.css";
import { Container } from "@mui/material";
import TopBar from "./components/TopBar";
import ContentMasonry from "./components/ContentMasonry";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";

const appTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <div className="App">
        <Container>
          <TopBar />
          <ContentMasonry />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
