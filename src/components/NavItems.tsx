'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import * as React from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

export default function NavItems() {
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);

  const navRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className='flex h-full items-center gap-4' ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const isOpen = activeIndex === i;

        const handleOpen = () => {
          if (isOpen) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const close = () => setActiveIndex(null);

        return (
          <NavItem
            key={category.value}
            category={category}
            isAnyOpen={isAnyOpen}
            isOpen={isOpen}
            close={close}
            handleOpen={handleOpen}
          />
        );
      })}
    </div>
  );
}
