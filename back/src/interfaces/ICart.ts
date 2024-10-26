import { IOrder } from "./IOrder";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface ICartItem {
    id: number;
    quantity: number;
    user: IUser;
    product: IProduct;
    order?: IOrder;
  }