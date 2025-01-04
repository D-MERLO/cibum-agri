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
exports.ProductService = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../entities/Product");
class ProductService {
    constructor() {
        this.productRepository = database_1.AppDataSource.getRepository(Product_1.Product); // Obtén el repositorio
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = this.productRepository.create(productData);
            return yield this.productRepository.save(newProduct);
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findOneBy({ id: productId });
        });
    }
    getProductsByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find({ where: { category } });
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find();
        });
    }
    updateProduct(productId, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.update(productId, productData);
            return yield this.productRepository.findOneBy({ id: productId });
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.delete(productId);
        });
    }
}
exports.ProductService = ProductService;
