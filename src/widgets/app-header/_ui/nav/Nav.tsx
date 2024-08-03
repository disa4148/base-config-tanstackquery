'use client';

import Link from 'next/link';

import { useUserStore } from '@/src/entities/user/store/useUserStore';
import { Button } from '@/src/shared/ui/button';

import css from './nav.module.scss';

const Nav: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className={css.wrapper}>
      <Link href={'/users'}>Users list</Link>
      <Link href={'/register'}>Registration</Link>
      <Link href={'/login'}>Authorization</Link>
      {user ? (
        <>
          <Link href={'/profile'}>Profile</Link>
          <p>Welcome, {user.fullname}</p>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : null}
    </header>
  );
};

export default Nav;
