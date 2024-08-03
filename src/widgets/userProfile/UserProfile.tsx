// src/widgets/userProfile/UserProfile.tsx
'use client';

import { useQuery } from '@tanstack/react-query';

import { userService } from '@/src/services/user.service';
import type { User } from '@/src/entities/auth/model/types';

const UserProfile: React.FC = () => {
  const { data: user } = useQuery<User, Error>({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
  });

  return (
    <div className="flex flex-col gap-5">
      <h1>User Profile</h1>
      <p>Full Name: {user?.fullname}</p>
      <p>Email: {user?.email.email}</p>
    </div>
  );
};

export default UserProfile;
