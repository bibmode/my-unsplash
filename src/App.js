import "./App.css";
import { Alert, Container, LinearProgress } from "@mui/material";
import TopBar from "./components/TopBar";
import ContentMasonry from "./components/ContentMasonry";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { createContext, useState, useEffect } from "react";
import CreateDialog from "./components/CreateDialog";
import DeleteDialog from "./components/DeleteDialog";
import { client } from "./client";
import { allImagesQuery } from "./utils/data";

const appTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    error: {
      main: "#EB5757",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
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
  const [addError, setAddError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contentLength, setContentLength] = useState(null);

  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);

    setUrl("");
    setLabel("");
  };

  useEffect(() => {
    setTimeout(() => {
      setPasswordError(false);
      setAddError(false);
    }, 3000);
  }, [passwordError, addError]);

  useEffect(() => {
    const query = allImagesQuery();

    client
      .fetch(query)
      .then((data) => {
        setImages(data);
        setContentLength(data.length);
      })
      .catch(console.error);
  }, []);

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
          label,
          setLabel,
          url,
          setUrl,
          setAddError,
          setPasswordError,
          contentLength,
          setContentLength,
        }}
      >
        <div className="App">
          {addError && (
            <Alert severity="error">Invalid URL ??? try Again! </Alert>
          )}
          {passwordError && (
            <Alert severity="error">Action denied ??? wrong password! </Alert>
          )}
          {loader && <LinearProgress color="primary" />}
          <Container maxWidth="xl">
            <TopBar />
            <ContentMasonry />
            <CreateDialog />
            <DeleteDialog />
          </Container>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
