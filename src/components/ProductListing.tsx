'use client';

import * as React from 'react';
import Link from 'next/link';
import { Product } from '@/payload-types';
import { Skeleton } from './ui/skeleton';
import { PRODUCT_CATEGORIES } from '@/config';
import ImageSlider from './ImageSlider';
import { cn, formatPrice } from '@/lib/utils';

export default function ProductListing({
  product,
  index,
}: {
  product: Product | null;
  index: number;
}) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = product.images
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[];

  if (isVisible && product) {
    return (
      <Link
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          'visible animate-in fade-in-5': isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />

          <h3 className='mt-4 font-medium text-sm text-gray-700'>
            {product.name}
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{label}</p>
          <p className='mt-1 font-medium text-sm text-gray-900'>
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='w-full h-full' />
      </div>
      <Skeleton className='w-2/3 h-4 mt-2 rounded-lg' />
      <Skeleton className='w-2/3 h-4 mt-2 rounded-lg' />
      <Skeleton className='w-2/3 h-4 mt-2 rounded-lg' />
    </div>
  );
};
