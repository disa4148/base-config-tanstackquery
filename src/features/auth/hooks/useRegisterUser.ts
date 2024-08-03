// src/features/auth/hooks/useRegisterUser.ts
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { authService } from '@/src/services/auth/auth.service';
import type {
  RegistrationData,
  ApiResponse,
} from '@/src/entities/auth/model/types';

export const useRegisterUser = (): UseMutationResult<
  ApiResponse,
  Error,
  RegistrationData
> => {
  return useMutation<ApiResponse, Error, RegistrationData>({
    mutationFn: (data: RegistrationData) => authService.registerUser(data),
    onError: (error: Error) => {
      console.error('Registration failed:', error);
    },
    onSuccess: (data: ApiResponse) => {
      console.log('Registration successful:', data.result.user);
    },
  });
};
