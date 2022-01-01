import "./App.css";
import { Container, LinearProgress } from "@mui/material";
import TopBar from "./components/TopBar";
import ContentMasonry from "./components/ContentMasonry";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { createContext, useState } from "react";
import CreateDialog from "./components/CreateDialog";

const appTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export const AppContext = createContext(null);

function App() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={appTheme}>
      <AppContext.Provider
        value={{
          open,
          setOpen,
          handleClickOpen,
          handleClose,
          images,
          setImages,
          loader,
          setLoader,
        }}
      >
        <div className="App">
          {loader && <LinearProgress color="primary" />}
          <Container>
            <TopBar />
            <ContentMasonry />
          </Container>
          <CreateDialog />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
