"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = require("../entities/Product");
const CartItem_1 = require("../entities/CartItem");
const User_1 = require("../entities/User");
const Order_1 = require("../entities/Order");
const Cart_1 = require("../entities/Cart");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Product_1.Product, CartItem_1.CartItem, User_1.User, Order_1.Order, Cart_1.Cart],
    synchronize: true, // Sincroniza automáticamente, solo en desarrollo
    logging: true,
});
