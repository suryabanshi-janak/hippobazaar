'use client';

import { Product } from '@/payload-types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export default function AddToCartButton({ product }: { product: Product }) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
      }}
      size='lg'
      className='w-full'
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
}
