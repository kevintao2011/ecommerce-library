/**
 * Tenant / SaaS enums.
 *
 * Framework-free, shared between backend and frontends.
 */

/** Lifecycle state of a tenant (shop). Mirrors the workflow described in
 *  multi-tenant-plan §2.2 and is set by both the onboarding flow and Stripe
 *  webhook handlers. */
export enum TenantStatus {
  TRIALING  = 'TRIALING',
  ACTIVE    = 'ACTIVE',
  PAST_DUE  = 'PAST_DUE',
  SUSPENDED = 'SUSPENDED',
  CANCELED  = 'CANCELED',
}

/** Role of a user *inside* a tenant. A user can have different roles across
 *  multiple tenants. */
export enum TenantRole {
  OWNER  = 'OWNER',
  ADMIN  = 'ADMIN',
  STAFF  = 'STAFF',
  VIEWER = 'VIEWER',
}

/** Plan codes. These are seeded — merchants pick one of these, not create new. */
export enum PlanCode {
  FREE    = 'free',
  STARTER = 'starter',
  GROWTH  = 'growth',
  PRO     = 'pro',
}

/** Mirrors Stripe subscription status. We store this verbatim from Stripe
 *  webhooks so it's easy to debug. */
export enum SubscriptionStatus {
  TRIALING           = 'trialing',
  ACTIVE             = 'active',
  PAST_DUE           = 'past_due',
  CANCELED           = 'canceled',
  UNPAID             = 'unpaid',
  INCOMPLETE         = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
}

/** Distinguishes browser-safe publishable keys from server-side secret keys.
 *  See multi-tenant-plan §6.2. */
export enum ApiKeyKind {
  PUBLISHABLE = 'PUBLISHABLE',
  SECRET      = 'SECRET',
}

/** Lifecycle of a custom domain attached to a tenant. */
export enum DomainTlsStatus {
  PENDING = 'pending',
  ISSUED  = 'issued',
  FAILED  = 'failed',
}

/** Events that can be sent via outbound webhooks. Add new events here as
 *  domain events grow. */
export enum WebhookEvent {
  ORDER_CREATED   = 'order.created',
  ORDER_PAID      = 'order.paid',
  ORDER_CANCELLED = 'order.cancelled',
  ORDER_SHIPPED   = 'order.shipped',
  ORDER_REFUNDED  = 'order.refunded',
  INVENTORY_LOW   = 'inventory.low',
  PRODUCT_CREATED = 'product.created',
  PRODUCT_UPDATED = 'product.updated',
}

/** Coarse-grained scopes attachable to an API key. Routes can require any
 *  combination via @RequiresScope. */
export enum ApiScope {
  CATALOG_READ     = 'catalog:read',
  CATALOG_WRITE    = 'catalog:write',
  ORDERS_READ      = 'orders:read',
  ORDERS_WRITE     = 'orders:write',
  INVENTORY_READ   = 'inventory:read',
  INVENTORY_WRITE  = 'inventory:write',
  CHECKOUT_WRITE   = 'checkout:write',
  TENANT_READ      = 'tenant:read',
}
