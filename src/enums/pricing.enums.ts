/**
 * Enums for the pricing domain.
 * Safe to import on both frontend and backend — no framework dependencies.
 */

/** How the promotion discount is applied */
export enum PromotionType {
  PERCENTAGE   = 'PERCENTAGE',   // e.g. 20% off
  FIXED        = 'FIXED',        // e.g. $10 off
  BOGO         = 'BOGO',         // buy one get one
  FREE_SHIPPING = 'FREE_SHIPPING',
}

/**
 * What the promotion applies to.
 * When CATEGORY or PRODUCT, target_id must be set.
 */
export enum PromotionScope {
  ALL      = 'ALL',      // applies to entire cart
  CATEGORY = 'CATEGORY', // applies to products in a specific category
  PRODUCT  = 'PRODUCT',  // applies to a specific product
}

/** How the coupon discount value is interpreted */
export enum CouponType {
  PERCENTAGE = 'PERCENTAGE', // e.g. 15% off the cart total
  FIXED      = 'FIXED',      // e.g. $20 off the cart total
}
