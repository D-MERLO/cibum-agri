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
exports.OrderService = void 0;
const database_1 = require("../config/database");
const Order_1 = require("../entities/Order");
class OrderService {
    constructor() {
        this.orderRepository = database_1.AppDataSource.getRepository(Order_1.Order);
    }
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = this.orderRepository.create(orderData);
            return yield this.orderRepository.save(order);
        });
    }
    getOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.find({ where: { user: { id: userId } }, relations: ['user', 'items'] }); // Utiliza la relación user y carga las relaciones necesarias
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.orderRepository.find({ relations: ['user', 'items'] }); // Carga las relaciones necesarias
        });
    }
}
exports.OrderService = OrderService;
