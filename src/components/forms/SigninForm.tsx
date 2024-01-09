'use client';

import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { cn } from '@/lib/utils';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/auth-credentials-validator';
import { Loader2 } from 'lucide-react';

export default function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSeller = searchParams.get('as') === 'seller';
  const origin = searchParams.get('origin');

  const continueAsSeller = () => {
    router.push('?as=seller');
  };

  const continueAsCustomer = () => {
    router.replace('/sign-in', undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Signed in successfully');

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push('/sell');
        return;
      }

      router.push('/');
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        toast.error('Invalid email or password');
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

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

          <Button type='submit'>
            {isLoading && (
              <Loader2 className='animate-spin w-4 h-4 mr-2 mt-0.5' />
            )}
            Sign in
          </Button>
        </div>
      </form>

      <div className='relative'>
        <div aria-hidden='true' className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='text-muted-foreground bg-background px-2'>or</span>
        </div>
      </div>

      {isSeller ? (
        <Button
          variant='secondary'
          onClick={continueAsCustomer}
          disabled={isLoading}
        >
          Continue as customer
        </Button>
      ) : (
        <Button
          variant='secondary'
          onClick={continueAsSeller}
          disabled={isLoading}
        >
          Continue as seller
        </Button>
      )}
    </div>
  );
}
