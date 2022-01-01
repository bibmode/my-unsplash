import { Button, InputAdornment, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Wrapper = styled("div")(({ theme }) => ({
  marginBlock: theme.spacing(4),
  marginInline: 12,
  display: "flex",
  alignItems: "center",
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginRight: "auto",
}));

const AddBtn = styled(Button)(({ theme }) => ({
  color: "#fff",
  textTransform: "none",
  fontWeight: 700,
  fontSize: 14,
  borderRadius: 12,
  alignSelf: "stretch",
  paddingInline: theme.spacing(3),
}));

const TopBar = () => {
  return (
    <Wrapper>
      <img src="my_unsplash_logo.svg" alt="logo" />

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
      />

      <AddBtn variant="contained" disableElevation>
        Add a photo
      </AddBtn>
    </Wrapper>
  );
};

export default TopBar;
