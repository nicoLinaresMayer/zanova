import { sanityClient } from './sanity.client'
import { PRODUCTS_QUERY } from './queries'

export async function getProducts() {

    const products = await sanityClient.fetch(PRODUCTS_QUERY);
 console.log('asdasd'); 
 console.log("IMAGES FROM SANITY:", products[0]?.images);
  return products
}