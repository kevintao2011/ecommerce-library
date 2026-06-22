import type { ApiClient } from './client.js';
import type { IOrder, OrderStatus } from './types.js';

export interface PlaceOrderDto {
  user_id?: string;
  /** Cart-based checkout — provide cart_id OR items[], not both. */
  cart_id?: string;
  /** Direct / POS checkout — provide items[] OR cart_id, not both. */
  items?: { variant_id: string; quantity: number }[];
  coupon_code?: string;
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  note?: string;
}

export class OrderApi {
  constructor(private readonly client: ApiClient) {}

  placeOrder(dto: PlaceOrderDto): Promise<IOrder> {
    return this.client.post('/order', dto);
  }

  listOrders(userId?: string): Promise<IOrder[]> {
    return this.client.get('/order', userId ? { user_id: userId } : undefined);
  }

  getOrder(id: string): Promise<IOrder> {
    return this.client.get(`/order/${id}`);
  }

  updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<IOrder> {
    return this.client.patch(`/order/${id}/status`, dto);
  }
}
