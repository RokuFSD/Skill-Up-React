import { forwardRef } from 'react';

const ItemScroll = forwardRef(({ children, large = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`${
        large ? 'h-full w-full' : 'h-144 shadow-xl border w-full'
      } overflow-y-scroll overflow-x-hidden
      scroll-smooth will-change-scroll
      scrollbar-thin
      scrollbar-thumb-neutral-300 scrollbar-track-transparent bg-gradient-to-bl from-sky-100 via-sky-200 to-sky-100 rounded-lg`}>
      {children}
    </div>
  );
});

export default ItemScroll;
