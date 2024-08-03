// src/services/user.service.ts
import { axiosWithAuth } from '@/src/api/interceptors';
import { API_URL } from '@/src/config/api.config';
import type { User } from '@/src/entities/auth/model/types';

class UserService {
  async getProfile(): Promise<User> {
    const response = await axiosWithAuth.get<{ result: User }>(
      API_URL.users('/profile'),
    );
    return response.data.result;
  }
}

export const userService = new UserService();
