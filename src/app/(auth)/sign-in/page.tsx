import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Icons } from '@/components/Icons';
import { buttonVariants } from '@/components/ui/button';
import SigninForm from '@/components/forms/SigninForm';

export default function SigninPage() {
  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-semibold tracking-tight'>
            Sign in to your account
          </h1>

          <Link
            className={buttonVariants({
              variant: 'link',
              className: 'gap-1.5',
            })}
            href='/sign-in'
          >
            Don&apos;t have an account?
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <SigninForm />
      </div>
    </div>
  );
}
