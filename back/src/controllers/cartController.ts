// src/controllers/cartController.ts

// import { Request, Response } from 'express';
// import { CartItem } from '../entities/CartItem';
// import { Product } from '../entities/Product';
// import { AppDataSource } from '../config/database';

// // Agregar un producto al carrito
// export const addProductToCart = async (req: Request, res: Response) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const productRepository = AppDataSource.getRepository(Product);
//     const cartRepository = AppDataSource.getRepository(CartItem);

//     const product = await productRepository.findOne({ where: { id: productId } });

//     if (!product) {
//       return res.status(404).json({ message: 'Producto no encontrado' });
//     }

//     let cartItem = await cartRepository.findOne({ where: { user: userId, product: productId } });

//     if (cartItem) {
//       cartItem.quantity += quantity;
//     } else {
//       cartItem = cartRepository.create({ user: { id: userId }, product, quantity });
//     }

//     await cartRepository.save(cartItem);
//     res.status(201).json({ message: 'Producto agregado al carrito', cartItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
//   }
// };

// // Obtener el carrito del usuario
// export const getCart = async (req: Request, res: Response) => {
//   const userId = req.user.id;

//   try {
//     const cartItems = await AppDataSource.getRepository(CartItem).find({
//       where: { user: userId },
//       relations: ['product'],
//     });
//     res.json(cartItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener el carrito', error });
//   }
// };

// // Actualizar la cantidad de un producto en el carrito
// export const updateCartItemQuantity = async (req: Request, res: Response) => {
//   const { cartItemId, quantity } = req.body;
//   const userId = req.user.id;

//   try {
//     const cartRepository = AppDataSource.getRepository(CartItem);
//     const cartItem = await cartRepository.findOne({ where: { id: cartItemId, user: userId } });

//     if (!cartItem) {
//       return res.status(404).json({ message: 'Item del carrito no encontrado' });
//     }

//     cartItem.quantity = quantity;
//     await cartRepository.save(cartItem);
//     res.json({ message: 'Cantidad actualizada', cartItem });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al actualizar la cantidad', error });
//   }
// };

// // Eliminar un producto del carrito
// export const removeProductFromCart = async (req: Request, res: Response) => {
//   const { cartItemId } = req.params;
//   const userId = req.user.id;

//   try {
//     const cartRepository = AppDataSource.getRepository(CartItem);
//     const cartItem = await cartRepository.findOne({ where: { id: cartItemId, user: userId } });

//     if (!cartItem) {
//       return res.status(404).json({ message: 'Item del carrito no encontrado' });
//     }

//     await cartRepository.remove(cartItem);
//     res.json({ message: 'Producto eliminado del carrito' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
//   }
// };

import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';

export const addProductToCart = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body;

    const productRepository = AppDataSource.getRepository(Product);
    const cartRepository = AppDataSource.getRepository(Cart);
    const cartItemRepository = AppDataSource.getRepository(CartItem);

    if (!req.user) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    try {
        const product = await productRepository.findOneBy({ id: productId });
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }

        let cart = await cartRepository.findOne({
            where: { user: { id: req.user.id } },
            relations: ['items', 'items.product']
        });

        if (!cart) {
            cart = cartRepository.create({
                user: req.user,
                items: []
            });
        }

        let cartItem = cart.items.find(item => item.product.id === productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = cartItemRepository.create({
                cart, // Asegúrate de establecer la relación con el carrito
                user: req.user,
                product,
                quantity
            });
            cart.items.push(cartItem);
        }

        await cartRepository.save(cart);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }

    const cartRepository = AppDataSource.getRepository(Cart);

    try {
        const cart = await cartRepository.findOne({
            where: { user: { id: req.user.id } },
            relations: ['items', 'items.product']
        });

        if (!cart) {
            res.status(404).json({ message: 'Carrito no encontrado' });
            return;
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};
