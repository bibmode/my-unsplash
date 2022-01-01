import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "t5chue7n", // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  token:
    "skZzeX254Dl5IuCM0Na1ThTBLCtIv9Du64k8dLa1xBB0j2zvUFXO9S1KekdAcIRtxWeAoAotjTz7VD8Poaa4NfskoFroi5U5Sklv7lvSRQ21WGBQxWVRv4PfTnd0MEPb4CJnNjhO5gqOaYaw8mSJ8Nxqk3Eyf4d7mqp0V8yf8GfTkEnC6824",
});

const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const urlFor = (source) => {
  return builder.image(source);
};
