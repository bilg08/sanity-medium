import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'
const projectId = "oqne7xej";
const dataset = "production";
const apiVersion = "2022-12-20";


 const config = {
	dataset,
	projectId,
	apiVersion:"2021-10-21",
	useCdn:true
}
const builder = imageUrlBuilder(config);

export const urlFor = (source) => builder.image(source)
export const sanityClient = createClient(config);

