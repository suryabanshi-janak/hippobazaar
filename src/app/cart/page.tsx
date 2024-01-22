'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn, formatPrice } from '@/lib/utils';

export default function Cart() {
  const { items, removeItem } = useCart();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 1;

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div
            className={cn('lg:col-span-7', {
              'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                isMounted && items.length === 0,
            })}
          >
            <h2 className='sr-only'>Items in your shopping cart</h2>

            {isMounted && items.length === 0 ? (
              <div className='flex flex-col items-center justify-center space-y-1 h-full'>
                <div
                  aria-hidden='true'
                  className='relative h-40 w-40 mb-4 text-muted-foreground'
                >
                  <Image
                    src='/hippo-empty-cart.png'
                    alt='empty cart hippo'
                    fill
                    loading='eager'
                  />
                </div>
                <h3 className='font-semibold text-2xl'>Your cart is empty</h3>
                <p className='text-muted-foreground text-center'>
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}
          </div>

          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='font-medium text-gray-900 text-lg'>Order Summary</h2>

            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>Subtotal</p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>Flat Transaction Fee</span>
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='text-base font-medium text-gray-900'>
                  Order Total
                </div>
                <div className='text-base font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <Button size='lg' className='w-full'>
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
