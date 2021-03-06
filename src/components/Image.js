import { Button, Stack, styled, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";

const Wrapper = styled(Stack)(({ theme }) => ({
  position: "relative",
}));

const ImageTools = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.38)",
  padding: theme.spacing(2),
  borderRadius: 24,

  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "auto",
  gridTemplateAreas: `"label label label button"
    "label label label ."
    "label label label ."
    "label label label ."
    "label label label ."`,
}));

const DeleteBtn = styled(Button)(({ theme }) => ({
  fontSize: 10,
  textTransform: "lowercase",
  gridArea: "button",
  height: "fit-content",
  borderRadius: 38,
}));

const Label = styled(Typography)(({ theme }) => ({
  gridArea: "label",
  alignSelf: "end",
  justifySelf: "start",
  color: "#fff",
  paddingBottom: theme.spacing(1),
  textAlign: "left",
}));

const Image = ({ item }) => {
  const { setOpenDelete, setDeleteItem } = useContext(AppContext);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setDeleteItem(item.label);
  };

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={item.picture.asset.url}
        srcSet={item.picture.asset.url}
        alt={item.label}
        loading="lazy"
        style={{
          borderRadius: 24,
        }}
      />
      {hover && (
        <ImageTools>
          <DeleteBtn
            onClick={(e) => {
              setOpenDelete(true);
              handleClick(e);
            }}
            variant="outlined"
            color="error"
          >
            delete
          </DeleteBtn>
          <Label variant="h6">{item.label}</Label>
        </ImageTools>
      )}
    </Wrapper>
  );
};

export default Image;
