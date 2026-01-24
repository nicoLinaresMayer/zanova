export const PRODUCTS_QUERY = `
*[_type == "product"]{
  title,
  price,
  images[]{
    asset->{
      _id,
      url
    }
  },
  variants[]{
    sku,
    color,
    size,
    stock,
    imageIndex
  }
}
`
