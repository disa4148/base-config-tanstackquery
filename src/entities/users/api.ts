// src/entities/users/api.ts
import { queryOptions } from '@tanstack/react-query';

import { axiosClassic } from '@/src/api/interceptors';
import type { User } from '@/src/entities/users/model/types';
import { API_URL } from '@/src/config/api.config';

export const usersOptions = queryOptions({
  queryKey: ['users'],
  queryFn: async (): Promise<User[]> => {
    const response = await axiosClassic.get(API_URL.users());
    return response.data;
  },
});
