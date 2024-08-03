// src/widgets/usersList/UsersList.tsx
'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { usersOptions } from '@/src/entities/users/api';
import type { User } from '@/src/entities/users/model/types';

const UsersList: React.FC = () => {
  const { data } = useSuspenseQuery(usersOptions);

  return (
    <div className="flex flex-col gap-5 ">
      <h1>Users list</h1>
      <ul>
        {data?.map((user: User) => <li key={user.id}> - {user.fullname}</li>)}
      </ul>
    </div>
  );
};

export default UsersList;
