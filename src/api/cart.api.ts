import type { ApiClient } from './client.js';
import type { ICart, ICheckoutPreview } from './types.js';

export interface CreateCartDto {
  user_id?: string;
  session_id?: string;
  expires_at?: string;
}

export interface AddCartItemDto {
  variant_id: string;
  quantity: number;
}

export interface CheckoutPreviewDto {
  items: { variant_id: string; quantity: number }[];
  coupon_code?: string;
}

export class CartApi {
  constructor(private readonly client: ApiClient) {}

  createCart(dto: CreateCartDto): Promise<ICart> {
    return this.client.post('/cart', dto);
  }

  getCart(id: string): Promise<ICart> {
    return this.client.get(`/cart/${id}`);
  }

  deleteCart(id: string): Promise<{ id: string; deleted: true }> {
    return this.client.delete(`/cart/${id}`);
  }

  addItem(cartId: string, dto: AddCartItemDto): Promise<ICart> {
    return this.client.post(`/cart/${cartId}/items`, dto);
  }

  updateItem(cartId: string, itemId: string, quantity: number): Promise<ICart> {
    return this.client.patch(`/cart/${cartId}/items/${itemId}`, { quantity });
  }

  removeItem(cartId: string, itemId: string): Promise<ICart> {
    return this.client.delete(`/cart/${cartId}/items/${itemId}`);
  }

  clearItems(cartId: string): Promise<ICart> {
    return this.client.delete(`/cart/${cartId}/items`);
  }

  /** Compute price breakdown without creating an order. */
  previewCheckout(dto: CheckoutPreviewDto): Promise<ICheckoutPreview> {
    return this.client.post('/checkout/preview', dto);
  }
}
