import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import bcrypt from 'bcrypt';
import { CartItem } from './CartItem';
import { Order } from './Order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ unique: true })
  dni!: number;

  @Column()
  phone!: number;

  @Column()
  direction!: string;

  @Column()
  ig?: string;

  @Column({ unique: true })
  @IsEmail()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'user' }) 
  role!: 'user' | 'admin';

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems!: CartItem[];

  // Método para encriptar la contraseña
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Método para comparar contraseñas
  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

