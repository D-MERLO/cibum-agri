// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// import { Product } from './Product';
// import { User } from './User';
// import { Order } from './Order';

// @Entity()
// export class CartItem {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   quantity!: number;

//   @ManyToOne(() => User, (user) => user.cartItems)
//   user!: User;  // Relación con el usuario que añadió el ítem al carrito

//   @ManyToOne(() => Product, (product) => product.cartItems)
//   product!: Product;  // Relación con el producto incluido en el ítem del carrito

//   @ManyToOne(() => Order, (order) => order.items, { nullable: true })
//   order!: Order;  // Relación con la orden, opcional si aún no se ha creado una orden
// }

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Product } from './Product';
import { User } from './User';
import { Order } from './Order';
import { Cart } from './Cart';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    quantity!: number;

    @ManyToOne(() => Cart, cart => cart.items)
    cart!: Cart;  // Relación con el carrito

    @ManyToOne(() => User, (user) => user.cartItems)
    user!: User;  // Relación con el usuario que añadió el ítem al carrito

    @ManyToOne(() => Product, (product) => product.cartItems)
    product!: Product;  // Relación con el producto incluido en el ítem del carrito

    @ManyToOne(() => Order, (order) => order.items, { nullable: true })
    order!: Order;  // Relación con la orden, opcional si aún no se ha creado una orden
}
