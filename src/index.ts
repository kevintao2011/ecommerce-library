/**
 * Shared types and utilities for ecommerce monorepo.
 * Re-export all from this barrel file.
 */

// Utility & common types
export * from './common.js';

// Domain enums — stable, safe to share across frontend and backend
export * from './enums/product.enums.js';
export * from './enums/pricing.enums.js';
export * from './enums/tenant.enums.js';

// Shared DTO interfaces — form shapes agreed between frontend and backend
export * from './dto/product.dto.js';
export * from './dto/brand.dto.js';
export * from './schema/brand.schema.js';

// Legacy interfaces (kept for reference, will be replaced when schema stabilises)
export * from './dimension.js';
export * from './inventory.js';
export * from './order/order.js';
export * from './product/product.js';
export * from './user.js';
export * from './weight.js';
