import { Box } from "@mui/system";
import React, { useContext } from "react";
import Masonry from "@mui/lab/Masonry";
import Image from "./Image";
import { AppContext } from "../App";
import { Typography } from "@mui/material";

const ContentMasonry = () => {
  const { images } = useContext(AppContext);

  return (
    <Box>
      {images?.length ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={3}>
          {images.map((item, index) => (
            <Image item={item} key={index} />
          ))}
        </Masonry>
      ) : (
        <Typography sx={{ mt: 10 }} variant="subtitle1">
          No results found
        </Typography>
      )}
    </Box>
  );
};

export default ContentMasonry;
