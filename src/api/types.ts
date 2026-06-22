/**
 * Entity interface types — mirror the backend entity shapes.
 * Used by the API client for typed responses and by frontends for local state.
 *
 * These are plain TypeScript interfaces with no framework dependencies.
 */

import type { ProductType, VariantType } from '../enums/product.enums.js';
import type { PromotionType, PromotionScope, CouponType } from '../enums/pricing.enums.js';
import type {
  TenantStatus,
  TenantRole,
  PlanCode,
  SubscriptionStatus,
  ApiKeyKind,
  DomainTlsStatus,
  WebhookEvent,
} from '../enums/tenant.enums.js';

// ── Tenant / SaaS ─────────────────────────────────────────────────────────────

/** Lightweight branding payload — surfaced via the public API so merchants
 *  can render their own logo/colours in their storefront. */
export interface ITenantBranding {
  logo_url?:        string | null;
  favicon_url?:     string | null;
  primary_color?:   string | null;
  secondary_color?: string | null;
}

export interface ITenant {
  id:                  string;
  slug:                string;
  name:                string;
  status:              TenantStatus;
  branding:            ITenantBranding | null;
  contact_email:       string;
  stripe_customer_id:  string | null;
  trial_ends_at:       string | null;
  allowed_origins:     string[] | null;
  created_at:          string;
  updated_at:          string;
}

export interface ITenantMembership {
  id:           string;
  tenant_id:    string;
  user_id:      string;
  email:        string | null;   // joined from auth.users for display
  role:         TenantRole;
  invited_at:   string;
  accepted_at:  string | null;
  tenant?:      ITenant;
}

export interface IPlanLimits {
  max_products:           number;   // -1 = unlimited
  max_orders_per_month:   number;
  max_api_calls_per_day:  number;
  max_warehouses:         number;
  max_staff:              number;
  custom_domain:          boolean;
  webhooks:               boolean;
  requests_per_minute:    number;
}

export interface IPlan {
  id:                  string;
  code:                PlanCode;
  name:                string;
  monthly_price_cents: number;
  stripe_price_id:     string | null;
  limits:              IPlanLimits;
  sort_order:          number;
  created_at:          string;
  updated_at:          string;
}

export interface ISubscription {
  id:                     string;
  tenant_id:              string;
  plan_id:                string;
  plan?:                  IPlan;
  stripe_subscription_id: string | null;
  status:                 SubscriptionStatus;
  current_period_start:   string | null;
  current_period_end:     string | null;
  canceled_at:            string | null;
  created_at:             string;
  updated_at:             string;
}

export interface IDomain {
  id:                  string;
  tenant_id:           string;
  hostname:            string;
  verification_token:  string;
  verified_at:         string | null;
  tls_status:          DomainTlsStatus;
  created_at:          string;
  updated_at:          string;
}

export interface IApiKey {
  id:           string;
  tenant_id:    string;
  name:         string;
  kind:         ApiKeyKind;
  /** First 12 chars of the key for identification, e.g. `pk_live_a1b2c3d4`. */
  key_prefix:   string;
  scopes:       string[];
  last_used_at: string | null;
  revoked_at:   string | null;
  created_at:   string;
}

/** Returned ONLY at creation time — `raw_key` is never shown again. */
export interface IApiKeyWithSecret extends IApiKey {
  raw_key: string;
}

export interface IWebhook {
  id:            string;
  tenant_id:     string;
  url:           string;
  events:        WebhookEvent[];
  is_active:     boolean;
  failure_count: number;
  created_at:    string;
  updated_at:    string;
}

/** Returned ONLY at creation time — `signing_secret` is never shown again. */
export interface IWebhookWithSecret extends IWebhook {
  signing_secret: string;
}

// ── Product ────────────────────────────────────────────────────────────────────

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  parent?: ICategory | null;
  children?: ICategory[];
  created_at: string;
  updated_at: string;
}

export interface IBrand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface IProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  type: VariantType;
  weight: number | null;
  dimensions: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  bundle_price: number | null;
  category: ICategory | null;
  brand: IBrand | null;
  variants: IProductVariant[];
  created_at: string;
  updated_at: string;
}

// ── Inventory ─────────────────────────────────────────────────────────────────

export interface IWarehouse {
  id: string;
  name: string;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface IVendor {
  id: string;
  name: string;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface IPhysicalStock {
  id: string;
  variant: IProductVariant;
  warehouse: IWarehouse;
  vendor: IVendor;
  quantity: number;
  cost: number;
  batch_id: string | null;
  expiry_date: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface IVirtualStock {
  id: string;
  variant: IProductVariant;
  quantity: number;
  location_note: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

// ── Warehouse 3D Layout ───────────────────────────────────────────────────────

/**
 * Represents a single storage slot within a rack.
 * Each slot maps to one 3D cube in the editor.
 */
export interface IRackSlotData {
  id: string;
  variantId: string | null;
  variantName: string | null;
  skuCode: string | null;
  quantity: number;       // current stock count in this slot
  maxCapacity: number;    // determines color (full/medium/low/empty)
}

/**
 * A rack placed on the warehouse grid.
 * Occupies gridX…gridX+cols-1 columns and gridZ…gridZ+depth-1 rows.
 */
export interface IRackData {
  id: string;
  label: string;
  gridX: number;    // left-edge grid column (0-indexed)
  gridZ: number;    // front-edge grid row   (0-indexed)
  cols: number;     // width  in grid cells
  depth: number;    // depth  in grid cells
  levels: number;   // number of shelf levels
  slots: IRackSlotData[];  // length = cols × depth × levels
}

/**
 * Full layout persisted in warehouse.layout_data.
 * Consumed by the 3D editor and returned from GET /warehouse/:id/layout.
 */
export interface IWarehouseLayoutData {
  gridCols: number;
  gridRows: number;
  racks: IRackData[];
}

// ── Pricing ───────────────────────────────────────────────────────────────────

export interface IPromotion {
  id: string;
  name: string;
  type: PromotionType;
  value: number;
  priority: number;
  can_stack: boolean;
  applies_to: PromotionScope;
  target_id: string | null;
  min_cart_total: number | null;
  start_at: string;
  end_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICoupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  usage_limit: number | null;
  used_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ── Checkout ──────────────────────────────────────────────────────────────────

export interface ICheckoutLine {
  variant_id: string;
  variant_name: string;
  sku: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_subtotal: number;
  promotions_applied: { id: string; name: string; type: string; discount: number }[];
  line_discount: number;
  line_total: number;
}

export interface ICheckoutPreview {
  lines: ICheckoutLine[];
  subtotal: number;
  promotion_discount: number;
  coupon_code: string | null;
  coupon_discount: number;
  total_amount: number;
  coupon_error?: string;
}

// ── Cart ──────────────────────────────────────────────────────────────────────

export interface ICartItem {
  id: string;
  variant: IProductVariant & { product: IProduct };
  quantity: number;
  unit_price_snapshot: number;
  created_at: string;
  updated_at: string;
}

export interface ICart {
  id: string;
  user_id: string | null;
  session_id: string | null;
  expires_at: string | null;
  items: ICartItem[];
  created_at: string;
  updated_at: string;
}

// ── Order ─────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING' | 'CONFIRMED' | 'PROCESSING'
  | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';

export interface IOrderItem {
  id: string;
  variant_id: string;
  variant_name: string;
  variant_sku: string;
  product_name: string | null;
  unit_price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrderStatusHistory {
  id: string;
  status: OrderStatus;
  note: string | null;
  created_at: string;
}

export interface IOrder {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  subtotal: number;
  promotion_discount: number;
  coupon_discount: number;
  total_amount: number;
  coupon_code: string | null;
  coupon_id: string | null;
  notes: string | null;
  items: IOrderItem[];
  status_history: IOrderStatusHistory[];
  created_at: string;
  updated_at: string;
}
