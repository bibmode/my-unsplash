import "./App.css";
import { Container, LinearProgress } from "@mui/material";
import TopBar from "./components/TopBar";
import ContentMasonry from "./components/ContentMasonry";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { createContext, useState } from "react";
import CreateDialog from "./components/CreateDialog";
import DeleteDialog from "./components/DeleteDialog";

const appTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 464,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const AppContext = createContext(null);

function App() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [images, setImages] = useState(null);
  const [loader, setLoader] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
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
          openDelete,
          setOpenDelete,
          deleteItem,
          setDeleteItem,
        }}
      >
        <div className="App">
          {loader && <LinearProgress color="primary" />}
          <Container maxWidth="xl">
            <TopBar />
            <ContentMasonry />
          </Container>
          <CreateDialog />
          <DeleteDialog />
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
