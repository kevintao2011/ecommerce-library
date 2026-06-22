/**
 * Shared DTO interfaces for the product domain.
 *
 * These interfaces describe the shape of data sent from the frontend to the
 * backend when creating or updating products. They are framework-free and safe
 * to use on both Expo (admin/storefront) and NestJS.
 *
 * The backend DTOs (class-validator decorated classes) should implement these
 * interfaces so the shapes stay in sync.
 */

import { ProductType, VariantType } from '../enums/product.enums.js';

// ---------------------------------------------------------------------------
// Supporting value types
// ---------------------------------------------------------------------------

/** A visual badge that appears on a product listing (e.g. "New", "Sale", "Hot") */
export interface IBadge {
  /** Display text shown on the badge */
  label: string;
  /**
   * Visual style hint — controls colour/icon in the UI.
   * Suggested values: "new" | "sale" | "hot" | "limited" | "info"
   * Kept as a plain string so new badge types can be added without a schema change.
   */
  type: string;
}

/** Physical package dimensions (used by PHYSICAL and FOOD variants) */
export interface IDimensions {
  /** Length in centimetres */
  length: number;
  /** Width in centimetres */
  width: number;
  /** Height in centimetres */
  height: number;
}

// ---------------------------------------------------------------------------
// Variant DTO
// ---------------------------------------------------------------------------

/**
 * Fields required to create one variant of a product.
 * A product must have at least one variant (which is its purchasable SKU).
 */
export interface ICreateVariantDto {
  /** Human-readable variant name, e.g. "Red / Large" */
  name: string;

  /** Stock-keeping unit — must be unique across the catalogue */
  sku: string;

  /** Base selling price in the merchant's default currency */
  price: number;

  /** Mirrors ProductType (minus BUNDLE) — determines inventory system used */
  type: VariantType;

  /**
   * Weight in grams.
   * Required for PHYSICAL and FOOD variants; omit for VIRTUAL and TICKET.
   */
  weight?: number;

  /**
   * Package dimensions in centimetres.
   * Required for PHYSICAL and FOOD variants; omit for VIRTUAL and TICKET.
   */
  dimensions?: IDimensions;

  /** Whether this variant is listed and purchasable. Defaults to true. */
  is_active?: boolean;
}

// ---------------------------------------------------------------------------
// Product DTO
// ---------------------------------------------------------------------------

/**
 * Fields required to create a new product.
 * After creation the backend will return the full product entity with its id.
 */
export interface ICreateProductDto {
  /** Public-facing product title */
  name: string;

  /** Long-form description; supports markdown on the storefront */
  description?: string;

  /**
   * Determines the inventory system and checkout rules applied to this product.
   * BUNDLE products have no variants of their own — they are composed via slots.
   */
  type: ProductType;

  /** Foreign key to the category this product belongs to */
  category_id?: string;

  /** Foreign key to the brand this product belongs to */
  brand_id?: string;

  /**
   * Searchable, filterable tags stored as a JSONB array.
   * e.g. ["summer", "sale", "unisex"]
   */
  tags?: string[];

  /**
   * Visual badges displayed on the product card.
   * e.g. [{ label: "New", type: "new" }, { label: "20% Off", type: "sale" }]
   */
  badges?: IBadge[];

  /**
   * Fixed override price shown when this product is sold as part of a bundle.
   * If null the bundle uses the sum of individual variant prices.
   * Only meaningful when type === BUNDLE.
   */
  bundle_price?: number;

  /** Whether the product is publicly listed. Defaults to true. */
  is_active?: boolean;

  /**
   * The initial set of variants to create alongside the product.
   * Must contain at least one entry for non-BUNDLE products.
   */
  variants?: ICreateVariantDto[];
}

// ---------------------------------------------------------------------------
// Update DTO
// ---------------------------------------------------------------------------

/**
 * PATCH /product/:id payload.
 * Every field is optional — only the keys present in the request body are
 * applied. Must match the backend's UpdateProductDto = PartialType(CreateProductDto).
 */
export type IUpdateProductDto = Partial<Omit<ICreateProductDto, 'variants'>>;

// ---------------------------------------------------------------------------
// Readback interfaces (GET responses)
// ---------------------------------------------------------------------------

/** Minimal shape returned by GET /category/:id (embedded inside product). */
export interface ICategoryRef {
  id: string;
  name: string;
}

/** Minimal shape returned by GET /brand/:id (embedded inside product). */
export interface IBrandRef {
  id: string;
  name: string;
}

/** Readback shape for a single variant row. */
export interface IProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  type: VariantType;
  weight: number | null;
  dimensions: IDimensions | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Full product entity as returned by GET /product and GET /product/:id.
 * The list endpoint embeds category & brand; the detail endpoint additionally
 * embeds variants.
 */
export interface IProduct {
  id: string;
  name: string;
  description: string | null;
  type: ProductType;
  category: ICategoryRef | null;
  brand: IBrandRef | null;
  bundle_price: number | null;
  tags: string[] | null;
  badges: IBadge[] | null;
  is_active: boolean;
  variants?: IProductVariant[];
  created_at: string;
  updated_at: string;
}
