import { Request, Response } from 'express';
import Product from '../entities/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, stock } = req.body;
    const product = Product.create({ name, description, price, image, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findOneBy({ id: parseInt(id) });
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  };
  
  export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await Product.find({ where: { category } });
  
      if (products.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos en esta categoría' });
      }
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos por categoría', error });
    }
  };
  

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.update(id, req.body);
    const updatedProduct = await Product.findOneBy({ id: parseInt(id) });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

