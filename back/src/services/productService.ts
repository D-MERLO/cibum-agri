import Product from '../entities/Product';

export const productService = {
  getProductById: async (id: number) => {
    return Product.findOneBy({ id });
  },

  getProductsByCategory: async (category: string) => {
    return Product.find({ where: { category } });
  },

  createProduct: async (productData: Partial<Product>) => {
    const product = Product.create(productData);
    await product.save();
    return product;
  },
};
