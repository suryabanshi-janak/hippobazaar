'use client';

import { Product } from '@/payload-types';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
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
        addItem(product);
      }}
      size='lg'
      className='w-full'
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
}
