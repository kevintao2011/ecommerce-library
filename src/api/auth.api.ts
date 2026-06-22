import type { ApiClient } from './client.js';

export interface SignInResponse {
  user: {
    id: string;
    email: string;
  } | null;
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  } | null;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
  } | null;
}

export class AuthApi {
  constructor(private readonly client: ApiClient) {}

  signIn(email: string, password: string): Promise<SignInResponse> {
    return this.client.post('/auth/sign-in', { email, password });
  }

  register(email: string, password: string): Promise<RegisterResponse> {
    return this.client.post('/auth/register', { email, password });
  }
}
