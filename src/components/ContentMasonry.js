import { Box } from "@mui/system";
import React, { useEffect, useContext } from "react";
import Masonry from "@mui/lab/Masonry";
import { client } from "../client";
import Image from "./Image";
import { AppContext } from "../App";

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

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Box>
      {images && (
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
          {images.map((item, index) => (
            <Image item={item} key={index} />
          ))}
        </Masonry>
      )}
    </Box>
  );
};

export default ContentMasonry;
