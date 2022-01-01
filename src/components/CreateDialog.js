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
  const { open, handleClose, setImages, setLoader } = useContext(AppContext);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [imageAsset, setImageAsset] = useState(null);

  const addPhoto = () => {
    console.log(url);
    console.log(label);
    setLoader(true);

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        // setImageAsset(blob);
        client.assets
          .upload("image", blob, {
            contentType: blob.type,
            filename: blob.size,
          })
          .then((document) => {
            console.log(document);
            assetUpdate(document);
          })
          .catch((error) => console.log(error));
      });

    handleClose();
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleLabel = (e) => {
    setLabel(e.target.value);
  };

  const assetUpdate = (image) => {
    const doc = {
      _type: "picture",
      label: label,
      picture: {
        _type: "image",
        asset: {
          _ref: image._id,
          _type: "reference",
        },
      },
    };

    client.create(doc).then((res) => {
      console.log(res);
      // window.location.reload();

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
    }`
        )
        .then((data) => {
          setImages(data);
          setLoader(false);
        })
        .catch(console.error);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new photo</DialogTitle>
      <Content>
        <TextField
          id="label-field"
          label="Label"
          // defaultValue="Hello World"
          value={label}
          onChange={handleLabel}
          variant="outlined"
        />
        <TextField
          id="url-field"
          label="Photo URL"
          // defaultValue="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
          value={url}
          onChange={handleUrl}
          variant="outlined"
          sx={{ mt: 5 }}
        />
      </Content>
      <Actions>
        <Button sx={{ textTransform: "none" }} onClick={handleClose}>
          Cancel
        </Button>
        <SubmitBtn onClick={addPhoto} variant="contained" disableElevation>
          Submit
        </SubmitBtn>
      </Actions>
    </Dialog>
  );
};

export default CreateDialog;
