"use strict";
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
exports.deleteProduct = exports.updateProduct = exports.getProductsByCategory = exports.getProducts = exports.getProduct = exports.createProduct = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../entities/Product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const { name, description, price, image, stock } = req.body;
        const newProduct = productRepository.create({ name, description, price, image, stock });
        yield productRepository.save(newProduct);
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const product = yield productRepository.findOneBy({ id: Number(req.params.id) });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const products = yield productRepository.find(); // Obtén todos los productos
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
});
exports.getProducts = getProducts;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const { category } = req.params;
        const products = yield productRepository.find({ where: { category } });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos por categoría', error });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const { id } = req.params;
        const updatedProduct = yield productRepository.update(id, req.body);
        if (updatedProduct.affected === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
        else {
            const product = yield productRepository.findOneBy({ id: Number(id) });
            res.status(200).json(product);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
        const { id } = req.params;
        const result = yield productRepository.delete(id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
        else {
            res.status(200).json({ message: 'Producto eliminado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
});
exports.deleteProduct = deleteProduct;
