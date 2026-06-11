const { z } = require('zod');

const productSchema = z.object({

  name: z.string({
    required_error: 'Nome é obrigatório'
  }).min(1, 'Nome é obrigatório'),

  price: z.coerce.number({
    required_error: 'Preço é obrigatório'
  }).positive('Preço deve ser maior que zero'),

  stock: z.coerce.number({
    required_error: 'Estoque é obrigatório'
  }).int().nonnegative('Estoque não pode ser negativo'),

  description: z.string().optional(),

  image_url: z.string().url('URL inválida').optional()

});

module.exports = productSchema;