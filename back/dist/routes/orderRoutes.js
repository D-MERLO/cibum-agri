"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const auth_1 = require("../middlewares/auth");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = (0, express_1.Router)();
router.post('/', auth_1.isAuthenticated, orderController_1.createOrder); // Protegida, solo usuarios logueados pueden crear una orden
router.get('/', auth_1.isAuthenticated, isAdmin_1.isAdmin, orderController_1.getAllOrders); // Solo administrador puede ver todas las órdenes
router.get('/user/:userId', auth_1.isAuthenticated, orderController_1.getOrdersByUserId); // Protegida, usuarios logueados ven su historial
exports.default = router;
