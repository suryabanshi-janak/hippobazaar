'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AuthCredenialsValidator,
  TAuthCredenialsValidator,
} from '@/lib/validators/auth-credentials-validator';
import { cn } from '@/lib/utils';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredenialsValidator>({
    resolver: zodResolver(AuthCredenialsValidator),
  });

  const onSubmit = ({ email, password }: TAuthCredenialsValidator) => {};

  return (
    <div className='grid gap-6'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1 py-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              {...register('email')}
              className={cn({
                'focus-visible:ring-red-500': errors.email,
              })}
              placeholder='you@example.com'
            />
            {errors?.email && (
              <p className='text-sm text-red-500'>{errors.email.message}</p>
            )}
          </div>

          <div className='grid gap-1 py-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              {...register('password')}
              type='password'
              className={cn({
                'focus-visible:ring-red-500': errors.email,
              })}
              placeholder='Password'
            />
            {errors?.password && (
              <p className='text-sm text-red-500'>{errors.password.message}</p>
            )}
          </div>

          <Button>Sign up</Button>
        </div>
      </form>
    </div>
  );
}
