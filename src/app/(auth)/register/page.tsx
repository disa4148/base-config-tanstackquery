// src/app/(auth)/register/page.tsx
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

import { useRegisterUser } from '@/src/features/auth/hooks/useRegisterUser';
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
import { formSchema } from '@/src/entities/auth/model/schema';
import type { ServerError } from '@/src/entities/auth/model/types';

type RegistrationFormValues = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

const RegistrationPage: React.FC = () => {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const { mutateAsync: registerUser } = useRegisterUser();
  const [isErrorsShown, setIsErrorsShown] = useState(false);

  const signUp = async (data: RegistrationFormValues) => {
    try {
      const response = await registerUser(data);
      toast.success('Registration successful!');
      console.log(response.result.user);
      form.reset();
    } catch (error) {
      const serverError = error as ServerError;
      const errorMessage =
        serverError.response?.data?.message ||
        'Registration failed. Please try again.';
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
          onSubmit={form.handleSubmit(signUp)}
          className="flex justify-center items-center flex-col gap-3 mt-16"
        >
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormDescription>
                  Your full name as it appears on your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>
                  Choose a unique username for your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Well never share your email with anyone else.
                </FormDescription>
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
                <FormDescription>
                  Your password must be 4-20 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => setIsErrorsShown(true)} variant={'default'}>
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegistrationPage;
