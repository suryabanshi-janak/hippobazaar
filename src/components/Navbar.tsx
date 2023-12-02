import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';

export default function Navbar() {
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
            </div>
          </MaxWidthWrapper>
        </div>
      </header>
    </div>
  );
}
