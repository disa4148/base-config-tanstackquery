import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { usersOptions } from '@/src/entities/users/api';
import { getQueryClient } from '@/src/config/get-query-client';
import UsersList from '@/src/widgets/usersList/UsersList';

const UsersPage: React.FC = async (): Promise<JSX.Element> => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(usersOptions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex justify-center items-center mt-16">
      <HydrationBoundary state={dehydratedState}>
        <UsersList />
      </HydrationBoundary>
    </main>
  );
};

export default UsersPage;
