// src/features/auth/hooks/useLoginUser.ts
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services/auth/auth.service';
import type { LoginData, ApiResponse } from '@/src/entities/auth/model/types';

export const useLoginUser = (): UseMutationResult<
  ApiResponse,
  Error,
  LoginData
> => {
  return useMutation<ApiResponse, Error, LoginData>({
    mutationFn: (data: LoginData) => authService.loginUser(data),
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
    onSuccess: (data: ApiResponse) => {
      console.log('Login successful:', data);
    },
  });
};
