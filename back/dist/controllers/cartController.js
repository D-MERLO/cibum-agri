"use strict";
// src/controllers/cartController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.addProductToCart = void 0;
const database_1 = require("../config/database");
const Cart_1 = require("../entities/Cart");
const CartItem_1 = require("../entities/CartItem");
const Product_1 = require("../entities/Product");
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    const productRepository = database_1.AppDataSource.getRepository(Product_1.Product);
    const cartRepository = database_1.AppDataSource.getRepository(Cart_1.Cart);
    const cartItemRepository = database_1.AppDataSource.getRepository(CartItem_1.CartItem);
    if (!req.user) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }
    try {
        const product = yield productRepository.findOneBy({ id: productId });
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return;
        }
        let cart = yield cartRepository.findOne({
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
        }
        else {
            cartItem = cartItemRepository.create({
                cart, // Asegúrate de establecer la relación con el carrito
                user: req.user,
                product,
                quantity
            });
            cart.items.push(cartItem);
        }
        yield cartRepository.save(cart);
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error });
    }
});
exports.addProductToCart = addProductToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
    }
    const cartRepository = database_1.AppDataSource.getRepository(Cart_1.Cart);
    try {
        const cart = yield cartRepository.findOne({
            where: { user: { id: req.user.id } },
            relations: ['items', 'items.product']
        });
        if (!cart) {
            res.status(404).json({ message: 'Carrito no encontrado' });
            return;
        }
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
});
exports.getCart = getCart;
