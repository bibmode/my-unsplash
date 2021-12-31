import { Box, styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { client } from "../client";
import { Stack } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({}));

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
    <Wrapper>
      {images && (
        <Masonry columns={3} spacing={3}>
          {images.map((item, index) => (
            <Stack key={index}>
              <img
                src={`${item.picture.asset.url}?w=162&auto=format`}
                srcSet={`${item.picture.asset.url}?w=162&auto=format&dpr=2 2x`}
                alt={item.label}
                loading="lazy"
                style={{
                  borderRadius: 24,
                }}
              />
            </Stack>
          ))}
        </Masonry>
      )}
    </Wrapper>
  );
};

export default ContentMasonry;
