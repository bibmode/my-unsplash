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

// form validation
const validationSchema = yup.object({
  password: yup.string("Enter the password").required("Password is required"),
});

const DeleteDialog = () => {
  const {
    openDelete,
    deleteItem,
    handleClose,
    setImages,
    setLoader,
    setPasswordError,
  } = useContext(AppContext);

  const deletePhoto = () => {
    if (deleteItem) {
      setLoader(true);

      client
        .delete({
          query: `*[_type == "picture" && label == "${deleteItem}"][0]`,
        })
        .then(() => {
          assetUpdate();
        })
        .catch((err) => {
          console.log(err.message);
          setLoader(false);
        });
    }

    handleClose();
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
      .catch((err) => {
        console.error(err);
        setLoader(false);
      });
  };

  // form validation

  const wrongPassword = () => {
    setPasswordError(true);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      values.password === "genevieve" ? deletePhoto() : wrongPassword();

      actions.resetForm({
        values: {
          // the type of `values` inferred to be Blog
          password: "",
        },
        // you can also set the other form states here
      });
    },
  });

  return (
    <Dialog open={openDelete} onClose={handleClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <Content>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            // value={password}
            // onChange={handlePassword}
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
            // onClick={deletePhoto}
            color="error"
            variant="contained"
            disableElevation
            type="submit"
          >
            Submit
          </DeleteBtn>
        </Actions>
      </form>
    </Dialog>
  );
};

export default DeleteDialog;
