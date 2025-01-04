import { AppDataSource } from '../config/database';
import { Order } from '../entities/Order';

export class OrderService {
    private orderRepository = AppDataSource.getRepository(Order);

    async createOrder(orderData: Partial<Order>): Promise<Order> {
        const order = this.orderRepository.create(orderData);
        return await this.orderRepository.save(order);
    }

    async getOrdersByUserId(userId: number): Promise<Order[]> {
        return await this.orderRepository.find({ where: { user: { id: userId } }, relations: ['user', 'items'] });  // Utiliza la relación user y carga las relaciones necesarias
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.find({ relations: ['user', 'items'] });  // Carga las relaciones necesarias
    }
}
