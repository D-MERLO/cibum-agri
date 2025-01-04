import { Request, Response } from 'express';
import { AppDataSource } from '../config/database'; 
import { Product } from '../entities/Product';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const { name, description, price, image, stock } = req.body;

        const newProduct = productRepository.create({ name, description, price, image, stock });
        await productRepository.save(newProduct);

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const product = await productRepository.findOneBy({ id: Number(req.params.id) });

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => { // Nueva función para obtener todos los productos
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const products = await productRepository.find();  // Obtén todos los productos
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const { category } = req.params;
        const products = await productRepository.find({ where: { category } });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos por categoría', error });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const { id } = req.params;
        const updatedProduct = await productRepository.update(id, req.body);

        if (updatedProduct.affected === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            const product = await productRepository.findOneBy({ id: Number(id) });
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productRepository = AppDataSource.getRepository(Product);  // Obtén el repositorio
        const { id } = req.params;
        const result = await productRepository.delete(id);

        if (result.affected === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else {
            res.status(200).json({ message: 'Producto eliminado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};
