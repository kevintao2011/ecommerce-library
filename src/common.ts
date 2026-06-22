/**
 * Common shared types: IDs, pagination, and standard API response shapes.
 * Used across frontend and backend to keep API contracts consistent.
 */

export type Id = string;

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

/** Query params for paginated list endpoints */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/** Standard shape returned by any paginated list endpoint */
export interface PaginatedResult<T> {
  data: T[];
  total: number;      // total number of matching records
  page: number;       // current page (1-indexed)
  limit: number;      // items per page
  totalPages: number;
}

// ---------------------------------------------------------------------------
// API response wrapper
// ---------------------------------------------------------------------------

/**
 * Standard success response envelope.
 * All API endpoints should wrap their payload in this shape so the
 * frontend can handle responses consistently.
 *
 * Example: { success: true, data: { id: '...', name: 'T-Shirt' } }
 */
export interface IApiResponse<T> {
  success: true;
  data: T;
}

/**
 * Standard error response envelope.
 *
 * Example: { success: false, error: { code: 'NOT_FOUND', message: 'Product not found' } }
 */
export interface IApiError {
  success: false;
  error: {
    code: string;    // machine-readable e.g. 'NOT_FOUND', 'VALIDATION_ERROR'
    message: string; // human-readable description
  };
}

/** Union type — use as the top-level return type for all API calls on the frontend */
export type ApiResult<T> = IApiResponse<T> | IApiError;
