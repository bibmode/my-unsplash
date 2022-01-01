import { Button, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../App";
import { client } from "../client";

const Wrapper = styled("div")(({ theme }) => ({
  marginBlock: theme.spacing(4),
  marginInline: 12,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
}));

const Logo = styled("div")(({ theme }) => ({
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
  const { handleClickOpen, setImages, setLoader } = useContext(AppContext);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoader(true);

      console.log(e.target.value);
      client
        .fetch(
          `*[_type == "picture" && (label match "${e.target.value}")]{
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
        .catch(console.error);
    }
  };

  return (
    <Wrapper>
      <Logo>
        <img src="my_unsplash_logo.svg" alt="logo" />
      </Logo>

      <SearchBar
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
