// schemaTypes/product.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    }),

    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number'
    }),

    defineField({
      name: 'variants',
      title: 'Variantes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              options: {
                    list: ['NEGRO' ,'BLANCO','AZUL']
                }
            },
            {
              name: 'size',
              title: 'Talle',
              type: 'string',
              options: {
                list: ['XS', 'S', 'M', 'L', 'XL']
                }
            },
            {
              name: 'stock',
              title: 'Stock',
              type: 'number',
              validation: Rule => Rule.integer().min(0)
            },
            {
              name: 'sku',
              title: 'SKU',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: "imageIndex",
              title: "Image index",
              type: "number",
              description: "Índice de la imagen del producto (0,1,2...)",
            },
          ]
        }
      ]
    }),
    {
  name: "images",
  title: "Images",
  type: "array",
  of: [{ type: "image" }],
  options: {
    hotspot: true,
  },
}
  ]
})
