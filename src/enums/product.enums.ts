/**
 * Enums for the product domain.
 * Safe to import on both frontend and backend — no framework dependencies.
 */

/** Determines which inventory system applies and which checkout rules are used */
export enum ProductType {
  PHYSICAL = 'PHYSICAL', // Physical goods in a warehouse
  VIRTUAL  = 'VIRTUAL',  // Digital goods, user-managed virtual inventory
  FOOD     = 'FOOD',     // Physical goods with a batch expiry date
  TICKET   = 'TICKET',   // Virtual goods with a per-batch session/event date
  BUNDLE   = 'BUNDLE',   // A product composed of other variants via bundle slots
}

/** Type of a purchasable variant — mirrors ProductType minus BUNDLE */
export enum VariantType {
  PHYSICAL = 'PHYSICAL',
  VIRTUAL  = 'VIRTUAL',
  FOOD     = 'FOOD',
  TICKET   = 'TICKET',
}

/**
 * Operator for a bundle slot — controls how multiple constraints are evaluated.
 * AND: the cart item must satisfy ALL constraints on the slot.
 * OR:  the cart item must satisfy ANY constraint on the slot.
 */
export enum SlotOperator {
  AND = 'AND',
  OR  = 'OR',
}

/**
 * The kind of constraint placed on a bundle slot.
 * Determines what constraint_id points to.
 */
export enum ConstraintType {
  VARIANT  = 'VARIANT',  // constraint_id = a specific variant id
  CATEGORY = 'CATEGORY', // constraint_id = a category id
  BRAND    = 'BRAND',    // constraint_id = a brand id
  TAG      = 'TAG',      // constraint_id = a tag string
}
