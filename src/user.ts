import type { Id } from './common.js';

/**
 * Ecommerce user roles.
 */
export type UserRole = 'customer' | 'seller' | 'admin';

/**
 * Ecommerce user – shared shape for auth, API, and services.
 */
export interface EcommerceUser {
  id: Id;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string; // ISO date
  updatedAt: string;
}

/**
 * Input type for creating or updating a user (e.g. API DTOs).
 */
export type EcommerceUserInput = Pick<EcommerceUser, 'email' | 'displayName' | 'role'> &
  Partial<Pick<EcommerceUser, 'id'>>;
