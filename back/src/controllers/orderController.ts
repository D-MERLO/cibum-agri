import { Request, Response } from 'express';
import { orderService } from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrdersByUserId(Number(req.params.userId));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las órdenes', error });
  }
};

export const getAllOrders = async (_: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todas las órdenes', error });
  }
};

