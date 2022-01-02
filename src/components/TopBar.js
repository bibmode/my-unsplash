import { Button, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../App";
import { client } from "../client";
import { allImagesQuery, searchQuery } from "../utils/data";

const Wrapper = styled("div")(({ theme }) => ({
  marginBlock: theme.spacing(4),
  marginInline: 12,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
}));

const Logo = styled("button")(({ theme }) => ({
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    flex: "0 0 100%",
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "left",
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginRight: "auto",
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
}));

const AddBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 12,
  alignSelf: "stretch",
  paddingInline: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    marginLeft: "auto",
  },
}));

const TopBar = () => {
  const { handleClickOpen, setImages, setLoader, contentLength, images } =
    useContext(AppContext);

  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoader(true);

      const query = searchQuery(e.target.value);

      client
        .fetch(query)
        .then((data) => {
          setImages(data);
          setLoader(false);
        })
        .catch(console.error);
    }
  };

  const getAllImages = () => {
    setInputValue("");

    if (contentLength !== images.length) {
      setLoader(true);
      const query = allImagesQuery();

      client
        .fetch(query)
        .then((data) => {
          setImages(data);
          setLoader(false);
        })
        .catch(console.error);
    }
  };

  return (
    <Wrapper>
      <Logo onClick={getAllImages}>
        <img src="my_unsplash_logo.svg" alt="logo" />
      </Logo>

      <SearchBar
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        variant="outlined"
        label="Search"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyPress={handleSearch}
      />

      <AddBtn onClick={handleClickOpen} variant="contained" disableElevation>
        Add a photo
      </AddBtn>
    </Wrapper>
  );
};

export default TopBar;
