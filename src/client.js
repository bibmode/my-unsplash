import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "t5chue7n", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
});
