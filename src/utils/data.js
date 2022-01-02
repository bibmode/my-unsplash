export const allImagesQuery = () => {
  const query = `*[_type == "picture"]{
      label,
      picture{
        asset->{
          _id,
          url
        },
      },
    } | order(_createdAt desc)`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "picture" && (label match "${searchTerm}")]{
      label,
      picture{
        asset->{
          _id,
          url
        },
      },
    } | order(_createdAt desc)`;

  return query;
};
