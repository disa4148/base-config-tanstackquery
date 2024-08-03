// src/features/profile/hooks/useUserProfile.ts
// import {
//   useSuspenseQuery,
//   type UseSuspenseQueryResult,
//   type UseSuspenseQueryOptions,
// } from '@tanstack/react-query';

// import { fetchUserProfile } from '@/src/entities/user/api';
// import type { User } from '@/src/entities/auth/model/types';

// export const useUserProfile = (): UseSuspenseQueryResult<User, Error> => {
//   const options: UseSuspenseQueryOptions<User, Error> = {
//     queryKey: ['userProfile'],
//     queryFn: fetchUserProfile,
//   };
//   return useSuspenseQuery<User, Error>(options);
// };
