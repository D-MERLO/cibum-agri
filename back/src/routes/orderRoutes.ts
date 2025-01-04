import { Router } from 'express';
import { createOrder, getAllOrders, getOrdersByUserId } from '../controllers/orderController';
import { isAuthenticated } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';

const router = Router();

router.post('/', isAuthenticated, createOrder); // Protegida, solo usuarios logueados pueden crear una orden
router.get('/', isAuthenticated, isAdmin, getAllOrders); // Solo administrador puede ver todas las órdenes
router.get('/user/:userId', isAuthenticated, getOrdersByUserId); // Protegida, usuarios logueados ven su historial

export default router;