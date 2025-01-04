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
exports.getAllOrders = exports.getOrdersByUserId = exports.createOrder = void 0;
const orderService_1 = require("../services/orderService");
const orderService = new orderService_1.OrderService();
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const newOrder = yield orderService.createOrder(orderData);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la orden', error });
    }
});
exports.createOrder = createOrder;
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        const orders = yield orderService.getOrdersByUserId(userId);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las órdenes del usuario', error });
    }
});
exports.getOrdersByUserId = getOrdersByUserId;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderService.getAllOrders();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener todas las órdenes', error });
    }
});
exports.getAllOrders = getAllOrders;
