import Link from 'next/link';
import { cookies } from 'next/headers';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import Cart from './Cart';
import { getServerSideUser } from '@/lib/payload-utils';
import UserAccountNav from './UserAccountNav';

export default async function Navbar() {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className='sticky top-0 inset-x-0'>
      <header className='relative bg-white'>
        <div className='border-b border-gray-200'>
          <MaxWidthWrapper>
            <div className='flex items-center h-16'>
              {/* TO DO: Mobile Nav */}

              <div className='ml-4 md:ml-0 flex'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='flex items-center ml-auto'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {user ? null : (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Create account
                    </Link>
                  )}

                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />

                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </header>
    </div>
  );
}
