import Order from '../entities/Order';

export const orderService = {
    createOrder: async (orderData: Partial<Order>) => {
        const order = Order.create(orderData);
        await order.save();
        return order;
    },

    getOrdersByUserId: async (userId: number) => {
        return Order.find({ where: { userId } });
    },

    getAllOrders: async () => {
        return Order.find({ relations: ['product'] }); // Incluye el producto en cada orden
    },
};