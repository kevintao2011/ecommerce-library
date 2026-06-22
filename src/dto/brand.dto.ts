/**
 * Shared DTO interfaces for the brand domain.
 *
 * These interfaces describe the brand payloads and readback shapes used by
 * the admin UI and backend. Framework-free — safe to import on both sides.
 */
import type { BrandStatus } from '../schema/brand.schema.js';

// ---------------------------------------------------------------------------
// Create / Update payloads
// ---------------------------------------------------------------------------

/** Payload accepted by POST /brand. */
export interface ICreateBrandDto {
  /** Display name — e.g. "Nike" */
  name: string;

  /**
   * Optional URL-safe slug — lowercase letters, digits, and hyphens only.
   * When omitted the backend derives it from `name`.
   */
  slug?: string;

  /** Active/inactive state. Defaults to "active" when omitted. */
  status?: BrandStatus;
}

/** PATCH /brand/:id payload. All fields optional. */
export type IUpdateBrandDto = Partial<ICreateBrandDto>;

// ---------------------------------------------------------------------------
// Readback
// ---------------------------------------------------------------------------

/** Full brand row as returned by GET /brand and GET /brand/:id. */
export interface IBrand {
  id: string;
  name: string;
  slug: string;
  status?: BrandStatus;
  created_at: string;
}
