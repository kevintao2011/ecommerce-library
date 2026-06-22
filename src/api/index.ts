/**
 * Shared API client for ecommerce-monorepo.
 *
 * Usage:
 *   import { createApiClient } from '@ecommerce-monorepo/shared/api';
 *
 *   const api = createApiClient({
 *     baseUrl: 'http://192.168.1.10:3001',
 *     getToken: () => AsyncStorage.getItem('access_token'),  // React Native
 *   });
 *
 *   const products = await api.product.listProducts();
 *   const cart     = await api.cart.createCart({ session_id: 'abc123' });
 *   const order    = await api.order.placeOrder({ cart_id: cart.id });
 */

export { ApiClient, ApiError } from './client.js';
export type { ApiClientConfig } from './client.js';

export { AuthApi } from './auth.api.js';
export { ProductApi } from './product.api.js';
export { InventoryApi } from './inventory.api.js';
export { CartApi } from './cart.api.js';
export { OrderApi } from './order.api.js';
export {
  TenantApi,
  MembershipApi,
  ApiKeyApi,
  WebhookApi,
  DomainApi,
  BillingApi,
} from './tenant.api.js';

export type * from './types.js';
export type * from './auth.api.js';
export type * from './product.api.js';
export type * from './inventory.api.js';
export type * from './cart.api.js';
export type * from './order.api.js';
export type * from './tenant.api.js';

import { ApiClient } from './client.js';
import type { ApiClientConfig } from './client.js';
import { AuthApi } from './auth.api.js';
import { ProductApi } from './product.api.js';
import { InventoryApi } from './inventory.api.js';
import { CartApi } from './cart.api.js';
import { OrderApi } from './order.api.js';
import {
  TenantApi,
  MembershipApi,
  ApiKeyApi,
  WebhookApi,
  DomainApi,
  BillingApi,
} from './tenant.api.js';

export interface EcommerceApiClient {
  auth:        AuthApi;
  product:     ProductApi;
  inventory:   InventoryApi;
  cart:        CartApi;
  order:       OrderApi;
  tenant:      TenantApi;
  members:     MembershipApi;
  apiKeys:     ApiKeyApi;
  webhooks:    WebhookApi;
  domains:     DomainApi;
  billing:     BillingApi;
}

/**
 * Create a fully-configured ecommerce API client.
 *
 * Supports both Supabase JWT auth (admin panel) and API-key auth (merchant
 * site/SDK). If `apiKey` is provided it's preferred over `getToken`.
 */
export function createApiClient(config: ApiClientConfig): EcommerceApiClient {
  const http = new ApiClient(config);
  return {
    auth:      new AuthApi(http),
    product:   new ProductApi(http),
    inventory: new InventoryApi(http),
    cart:      new CartApi(http),
    order:     new OrderApi(http),
    tenant:    new TenantApi(http),
    members:   new MembershipApi(http),
    apiKeys:   new ApiKeyApi(http),
    webhooks:  new WebhookApi(http),
    domains:   new DomainApi(http),
    billing:   new BillingApi(http),
  };
}
