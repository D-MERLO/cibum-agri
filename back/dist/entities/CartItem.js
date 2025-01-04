"use strict";
// import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
// import { Product } from './Product';
// import { User } from './User';
// import { Order } from './Order';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
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
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
const Order_1 = require("./Order");
const Cart_1 = require("./Cart");
let CartItem = class CartItem {
};
exports.CartItem = CartItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cart_1.Cart, cart => cart.items),
    __metadata("design:type", Cart_1.Cart)
], CartItem.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.cartItems),
    __metadata("design:type", User_1.User)
], CartItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.cartItems),
    __metadata("design:type", Product_1.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, (order) => order.items, { nullable: true }),
    __metadata("design:type", Order_1.Order)
], CartItem.prototype, "order", void 0);
exports.CartItem = CartItem = __decorate([
    (0, typeorm_1.Entity)()
], CartItem);
