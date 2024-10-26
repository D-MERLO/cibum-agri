import { Router } from 'express';
import { createOrder, getAllOrders, getOrdersByUserId } from '../controllers/orderController';
import { verifyToken, isAdmin } from '../middlewares/auth';

const router = Router();

router.post('/', verifyToken, createOrder); // Protegida, solo usuarios logueados pueden crear una orden
router.get('/', verifyToken, isAdmin, getAllOrders); // Solo administrador puede ver todas las órdenes
router.get('/user/:userId', verifyToken, getOrdersByUserId); // Protegida, usuarios logueados ven su historial

export default router;
