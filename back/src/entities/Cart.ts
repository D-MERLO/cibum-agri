import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { CartItem } from './CartItem';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.carts)
    user!: User;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: true })
    items!: CartItem[];
}
