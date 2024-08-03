import { axiosClassic, axiosWithAuth } from '@/src/api/interceptors';
import { API_URL } from '@/src/config/api.config';
import { useUserStore } from '@/src/entities/user/store/useUserStore';
import type {
  ApiResponse,
  RefreshTokenResponse,
  LoginData,
  RegistrationData,
} from '@/src/entities/auth/model/types';

import { saveToStorage, removeFromStorage } from './auth-token-service';

class AuthService {
  async registerUser(data: RegistrationData): Promise<ApiResponse> {
    const response = await axiosClassic.post<ApiResponse>(
      API_URL.auth('/registration'),
      data,
    );
    return response.data;
  }

  async loginUser(data: LoginData): Promise<ApiResponse> {
    const response = await axiosClassic.post<ApiResponse>(
      API_URL.auth('/login'),
      data,
    );
    if (response.data.result.tokens.accessToken) {
      saveToStorage(response.data.result.tokens);
      useUserStore.getState().setUser(response.data.result.user);
      console.log('The data is saved in storage');
    }
    return response.data;
  }

  async getNewTokens(): Promise<void> {
    try {
      const response = await axiosClassic.get<RefreshTokenResponse>(
        API_URL.auth('/refresh'),
        { withCredentials: true },
      );
      if (response.data.result.accessToken) {
        console.log('The access token is saved in storage from the server');
        saveToStorage({ accessToken: response.data.result.accessToken });
      }
    } catch (error) {
      removeFromStorage();
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await axiosWithAuth.delete(API_URL.auth('/logout'), {
        withCredentials: true,
      });
      console.log('Successfully logged out');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

export const authService = new AuthService();
