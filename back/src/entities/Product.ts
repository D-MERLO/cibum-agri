import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { CartItem } from './CartItem';
import { Order } from './Order';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('float')
  price!: number;

  @Column()
  image!: string;

  @Column({ default: 1 })
  amount!: number;

  @Column({ default: 0 })
  stock!: number;
  
  @Column()
  category!: string; 

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems!: CartItem[];

  @OneToMany(() => Order, (order) => order.product)
  orders!: Order[];  // Relación inversa hacia las órdenes que incluyen este producto
}