import { Box } from "@mui/system";
import React, { useEffect, useContext } from "react";
import Masonry from "@mui/lab/Masonry";
import { client } from "../client";
import Image from "./Image";
import { AppContext } from "../App";
import { Typography } from "@mui/material";

const ContentMasonry = () => {
  const { images, setImages } = useContext(AppContext);

  useEffect(() => {
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
      .then((data) => setImages(data))
      .catch(console.error);
  }, []);

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
