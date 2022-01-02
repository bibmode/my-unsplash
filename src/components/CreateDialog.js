import React, { useContext } from "react";
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
import * as yup from "yup";
import { useFormik } from "formik";

// form validation
const validationSchema = yup.object({
  url: yup.string("Enter Photo URL").required("URL is required"),
  label: yup.string("Enter Label").required("Label is required"),
});

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

const SubmitBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  borderRadius: 12,
}));

const CreateDialog = () => {
  const {
    open,
    handleClose,
    setImages,
    setLoader,
    setAddError,
    setContentLength,
  } = useContext(AppContext);

  const addPhoto = (url, label) => {
    setLoader(true);

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        client.assets
          .upload("image", blob, {
            contentType: blob.type,
            filename: blob.size,
          })
          .then((document) => {
            assetUpdate(document, label);
          })
          .catch((error) => {
            setLoader(false);
            setAddError(true);
          });
      });

    handleClose();
  };

  const assetUpdate = (image, label) => {
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

    client.create(doc).then(() => {
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
          setContentLength(data.length);
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    });
  };

  const formik = useFormik({
    initialValues: {
      label: "",
      url: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      addPhoto(values.url, values.label);

      actions.resetForm({
        values: {
          label: "",
          url: "",
        },
      });
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new photo</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <Content>
          <TextField
            id="label"
            name="label"
            label="Label"
            value={formik.values.label}
            onChange={formik.handleChange}
            error={formik.touched.label && Boolean(formik.errors.label)}
            helperText={formik.touched.label && formik.errors.label}
            // onChange={handleLabel}
            variant="outlined"
          />
          <TextField
            // defaultValue="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            variant="outlined"
            sx={{ mt: 5 }}
            id="url"
            name="url"
            label="Photo URL"
            value={formik.values.url}
            onChange={formik.handleChange}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
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
          <SubmitBtn
            type="submit"
            // onClick={addPhoto}
            variant="contained"
            disableElevation
          >
            Submit
          </SubmitBtn>
        </Actions>
      </form>
    </Dialog>
  );
};

export default CreateDialog;
