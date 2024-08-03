// src/app/(auth)/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

import { useLoginUser } from '@/src/features/auth/hooks/useLoginUser';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/src/shared/ui/form';
import { Input } from '@/src/shared/ui/input';
import { Button } from '@/src/shared/ui/button';
import { loginSchema } from '@/src/entities/auth/model/schema';
import type { ServerError } from '@/src/entities/auth/model/types';

type LoginFormValues = {
  account: string;
  password: string;
  tfaCode?: string;
};

const LoginPage: React.FC = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { mutateAsync: loginUser } = useLoginUser();
  const [isErrorsShown, setIsErrorsShown] = useState(false);

  const signIn = async (data: LoginFormValues) => {
    try {
      await loginUser(data);
      toast.success('Login successful!');
    } catch (error) {
      const serverError = error as ServerError;
      const errorMessage =
        serverError.response?.data?.message ||
        'Login failed. Please try again.';
      toast.error(errorMessage);
      if (isErrorsShown) {
        form.setError('root', { type: 'manual', message: errorMessage });
      }
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signIn)}
          className="flex justify-center items-center flex-col gap-3 mt-16"
        >
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Input placeholder="Username or Email" {...field} />
                </FormControl>
                <FormDescription>Enter your username or email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tfaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2FA Code</FormLabel>
                <FormControl>
                  <Input placeholder="2FA Code (if enabled)" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your 2FA code if enabled.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => setIsErrorsShown(true)} variant={'default'}>
            Login
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginPage;
