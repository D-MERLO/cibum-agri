import { IUser } from "./IUser";

export interface IOrder {
    id: number;
    user: IUser;
    totalAmount: number;
    createdAt: Date;
    delivery: Date;
  }