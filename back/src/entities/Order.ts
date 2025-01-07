import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {Product} from './Product';
import { CartItem } from './CartItem';
import { User } from './User';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @Column()
  quantity!: number;

  @Column('decimal')
  total!: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED'],
    default: 'PENDING',
  })
  status!: 'PENDING' | 'COMPLETED';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
 
  @ManyToOne(() => User, (user) => user.orders)
  user!: User;  // Relación con User para obtener el usuario que hizo el pedido

  @ManyToOne(() => Product, (product) => product.orders)
  product!: Product;

  @OneToMany(() => CartItem, (cartItem) => cartItem.order, { cascade: true })
  items!: CartItem[];
}

