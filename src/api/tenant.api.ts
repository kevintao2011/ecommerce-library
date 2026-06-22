/**
 * Tenant / SaaS namespace for the shared API client.
 *
 * Covers: tenant CRUD, memberships, plans/subscriptions, API keys, webhooks,
 * domains, and billing portal links.
 */

import type { ApiClient } from './client.js';
import type {
  ITenant,
  ITenantMembership,
  IPlan,
  ISubscription,
  IApiKey,
  IApiKeyWithSecret,
  IWebhook,
  IWebhookWithSecret,
  IDomain,
  ITenantBranding,
} from './types.js';
import type { TenantRole, WebhookEvent } from '../enums/tenant.enums.js';

export interface CreateTenantPayload {
  slug:           string;
  name:           string;
  contact_email:  string;
  branding?:      ITenantBranding;
}

export interface UpdateTenantPayload {
  name?:          string;
  contact_email?: string;
  branding?:      ITenantBranding;
}

export interface InviteMemberPayload {
  email: string;
  role:  TenantRole;
}

export interface CreateApiKeyPayload {
  name:    string;
  kind:    'PUBLISHABLE' | 'SECRET';
  scopes?: string[];
}

export interface CreateWebhookPayload {
  url:    string;
  events: WebhookEvent[];
}

export interface AddDomainPayload {
  hostname: string;
}

export class TenantApi {
  constructor(private readonly http: ApiClient) {}

  /** Public info about the tenant resolved from the current request context. */
  getCurrent():  Promise<ITenant> { return this.http.get('/tenant/current'); }

  list():        Promise<ITenant[]>    { return this.http.get('/tenant'); }
  findOne(id: string): Promise<ITenant> { return this.http.get(`/tenant/${id}`); }
  create(dto: CreateTenantPayload): Promise<ITenant> { return this.http.post('/tenant', dto); }
  update(id: string, dto: UpdateTenantPayload): Promise<ITenant> { return this.http.patch(`/tenant/${id}`, dto); }
  remove(id: string): Promise<{ id: string; deleted: true }> { return this.http.delete(`/tenant/${id}`); }

  /** Re-sign the JWT to scope subsequent requests to the chosen tenant. */
  selectTenant(id: string): Promise<{ access_token: string; tenant: ITenant; role: TenantRole }> {
    return this.http.post(`/auth/select-tenant/${id}`, {});
  }
}

export class MembershipApi {
  constructor(private readonly http: ApiClient) {}

  list(): Promise<ITenantMembership[]> { return this.http.get('/tenant/members'); }
  invite(dto: InviteMemberPayload): Promise<ITenantMembership> { return this.http.post('/tenant/members', dto); }
  updateRole(id: string, role: TenantRole): Promise<ITenantMembership> { return this.http.patch(`/tenant/members/${id}`, { role }); }
  remove(id: string): Promise<{ id: string; deleted: true }> { return this.http.delete(`/tenant/members/${id}`); }
}

export class ApiKeyApi {
  constructor(private readonly http: ApiClient) {}

  list(): Promise<IApiKey[]> { return this.http.get('/tenant/api-keys'); }
  /** Returns the full raw key in `raw_key` — this is the only time the
   *  caller will see it. UI must render a one-time reveal. */
  create(dto: CreateApiKeyPayload): Promise<IApiKeyWithSecret> { return this.http.post('/tenant/api-keys', dto); }
  revoke(id: string): Promise<{ id: string; revoked: true }> { return this.http.delete(`/tenant/api-keys/${id}`); }
}

export class WebhookApi {
  constructor(private readonly http: ApiClient) {}

  list(): Promise<IWebhook[]> { return this.http.get('/tenant/webhooks'); }
  /** Returns `signing_secret` in the response — shown only once. */
  create(dto: CreateWebhookPayload): Promise<IWebhookWithSecret> { return this.http.post('/tenant/webhooks', dto); }
  toggleActive(id: string, is_active: boolean): Promise<IWebhook> { return this.http.patch(`/tenant/webhooks/${id}`, { is_active }); }
  remove(id: string): Promise<{ id: string; deleted: true }> { return this.http.delete(`/tenant/webhooks/${id}`); }
}

export class DomainApi {
  constructor(private readonly http: ApiClient) {}

  list(): Promise<IDomain[]> { return this.http.get('/tenant/domains'); }
  add(dto: AddDomainPayload): Promise<IDomain> { return this.http.post('/tenant/domains', dto); }
  /** Force a manual TXT-record verification check. */
  verify(id: string): Promise<IDomain> { return this.http.post(`/tenant/domains/${id}/verify`, {}); }
  remove(id: string): Promise<{ id: string; deleted: true }> { return this.http.delete(`/tenant/domains/${id}`); }
}

export class BillingApi {
  constructor(private readonly http: ApiClient) {}

  /** All available plans (seeded, read-only). */
  listPlans(): Promise<IPlan[]> { return this.http.get('/billing/plans'); }
  /** Current subscription for the active tenant. */
  current(): Promise<ISubscription | null> { return this.http.get('/billing/subscription'); }
  /** Counts vs plan.limits — for the usage/limit UI. */
  usage(): Promise<{ products: number; orders_this_month: number; api_calls_today: number; warehouses: number; staff: number }> { return this.http.get('/billing/usage'); }
  /** Returns a Stripe Checkout Session URL that the admin redirects to. */
  startCheckout(plan_code: string): Promise<{ url: string }> { return this.http.post('/billing/checkout-session', { plan_code }); }
  /** Returns a Stripe Customer Portal URL for invoice history + payment method changes. */
  openPortal(): Promise<{ url: string }> { return this.http.post('/billing/portal', {}); }
}
