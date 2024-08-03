export interface RegistrationData {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  account: string;
  password: string;
  tfaCode?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface ServerError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface User {
  id: string;
  fullname: string;
  bio: string | null;
  createdAt: string;
  meta: {
    id: string;
    name: string;
    description: string | null;
  };
  email: {
    id: string;
    email: string;
    verified: boolean;
    token: string;
  };
  avatar: {
    id: string;
    icon: string | null;
    cover: string | null;
  };
  tfa: boolean;
  notification: {
    id: string;
    news: boolean;
  };
}

export interface AuthResponse {
  tokens: Tokens;
  user: User;
}

export interface ApiResponse {
  ok: boolean;
  result: AuthResponse;
}

export interface RefreshTokenResponse {
  ok: boolean;
  message: string;
  result: {
    accessToken: string;
  };
}
