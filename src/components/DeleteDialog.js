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
import { client } from "../client";

const Content = styled(DialogContent)(({ theme }) => ({
  paddingTop: `${theme.spacing(1)} !important`,
  display: "flex",
  flexDirection: "column",
  width: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const Actions = styled(DialogActions)(({ theme }) => ({
  paddingBottom: theme.spacing(3),
  paddingInline: theme.spacing(3),
}));

const DeleteBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  borderRadius: 12,
}));

const DeleteDialog = () => {
  const { openDelete, deleteItem, handleClose, setImages, setLoader } =
    useContext(AppContext);
  const [password, setPassword] = useState("");
  const [imageAsset, setImageAsset] = useState(null);

  const deletePhoto = () => {
    console.log(password);
    // setLoader(true);
    // console.log(deleteItem);
    if (password === "genevieve" && deleteItem) {
      setLoader(true);

      client
        .delete({
          query: `*[_type == "picture" && label == "${deleteItem}"][0]`,
        })
        .then(() => {
          console.log("item deleted");

          assetUpdate();
        })
        .catch((err) => console.log(err.message));
    }

    handleClose();
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const assetUpdate = () => {
    client
      .fetch(
        `*[_type == "picture"]{
      label,
      picture{
        asset->{
          _id,
          url
        },
      },
    } | order(_createdAt desc)`
      )
      .then((data) => {
        setImages(data);
        setLoader(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <Content>
        <TextField
          id="password-field"
          label="Password"
          value={password}
          onChange={handlePassword}
          variant="outlined"
        />
      </Content>
      <Actions>
        <Button
          sx={{ textTransform: "none", color: "#BDBDBD" }}
          color="inherit"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <DeleteBtn
          onClick={deletePhoto}
          color="warning"
          variant="contained"
          disableElevation
        >
          Submit
        </DeleteBtn>
      </Actions>
    </Dialog>
  );
};

export default DeleteDialog;
