// src/app/(auth)/profile/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/src/config/get-query-client';
import UserProfile from '@/src/widgets/userProfile/UserProfile';
import { userService } from '@/src/services/user.service';

const ProfilePage: React.FC = async (): Promise<JSX.Element> => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex justify-center items-center mt-16">
      <HydrationBoundary state={dehydratedState}>
        <UserProfile />
      </HydrationBoundary>
    </main>
  );
};

export default ProfilePage;
