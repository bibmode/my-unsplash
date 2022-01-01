import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
} from "@mui/material";
import { AppContext } from "../App";

const Content = styled(DialogContent)(({ theme }) => ({
  paddingTop: `${theme.spacing(1)} !important`,
  display: "flex",
  flexDirection: "column",
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Actions = styled(DialogActions)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  paddingInline: theme.spacing(3),
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  borderRadius: 12,
}));

const CreateDialog = () => {
  const { open, handleClose } = useContext(AppContext);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new photo</DialogTitle>
      <Content>
        <TextField
          id="label"
          label="Label"
          defaultValue="Hello World"
          variant="outlined"
        />
        <TextField
          id="url"
          label="Photo URL"
          defaultValue="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
          variant="outlined"
          sx={{ mt: 5 }}
        />
      </Content>
      <Actions>
        <Button sx={{ textTransform: "none" }} onClick={handleClose}>
          Cancel
        </Button>
        <SubmitBtn onClick={handleClose} variant="contained" disableElevation>
          Submit
        </SubmitBtn>
      </Actions>
    </Dialog>
  );
};

export default CreateDialog;
