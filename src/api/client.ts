/**
 * Base API client — thin fetch wrapper with:
 *   - configurable base URL + auth token
 *   - typed JSON responses
 *   - consistent error normalisation
 *
 * Framework-free: works in React Native (Expo) and browser environments.
 * Do NOT import NestJS, Axios, or any Node-only module here.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
    message?: string,
  ) {
    super(message ?? `HTTP ${status}`);
    this.name = 'ApiError';
  }
}

export interface ApiClientConfig {
  /** Base URL of the NestJS backend, e.g. "http://192.168.1.10:3001" */
  baseUrl: string;
  /**
   * Returns the current Supabase Bearer token (admin panel usage). Called
   * before every request so token refreshes are transparent.
   */
  getToken?: () => string | null | undefined;
  /**
   * Static API key for the open `/v1/*` API (merchant site / SDK usage). If
   * set, takes precedence over `getToken`. Use `pk_live_…` for browsers and
   * `sk_live_…` for server-side calls.
   */
  apiKey?: string;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getToken?: () => string | null | undefined;
  private readonly apiKey?: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.getToken = config.getToken;
    this.apiKey   = config.apiKey;
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...extra,
    };
    // API key wins if both are present — merchants embedding pk_* in a
    // browser SDK never want their Supabase token used by accident.
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    } else {
      const token = this.getToken?.();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async get<T>(path: string, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    const url = this.buildUrl(path, query);
    const res = await fetch(url, { headers: this.buildHeaders() });
    return this.unwrap<T>(res);
  }

  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return this.unwrap<T>(res);
  }

  async patch<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: this.buildHeaders(),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    return this.unwrap<T>(res);
  }

  async delete<T = void>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });
    return this.unwrap<T>(res);
  }

  private buildUrl(
    path: string,
    query?: Record<string, string | number | boolean | undefined>,
  ): string {
    if (!query) return `${this.baseUrl}${path}`;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) {
        params.set(k, String(v));
      }
    }
    const qs = params.toString();
    return qs ? `${this.baseUrl}${path}?${qs}` : `${this.baseUrl}${path}`;
  }

  private async unwrap<T>(res: Response): Promise<T> {
    let body: unknown;
    const ct = res.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
    if (!res.ok) {
      throw new ApiError(res.status, body);
    }
    return body as T;
  }
}
