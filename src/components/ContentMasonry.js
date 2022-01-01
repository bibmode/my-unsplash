import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { client } from "../client";
import { Stack } from "@mui/material";
import Image from "./Image";

const ContentMasonry = () => {
  const [images, setImages] = useState(null);

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
    }`
      )
      .then((data) => setImages(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Box>
      {images && (
        <Masonry columns={{ xs: 2, md: 3 }} spacing={3}>
          {images.map((item, index) => (
            <Image item={item} key={index} />
          ))}
        </Masonry>
      )}
    </Box>
  );
};

export default ContentMasonry;
