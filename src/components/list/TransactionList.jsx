import { forwardRef } from 'react';

const TransactionList = forwardRef(({ children, large = false }, ref) => {
  return (
    <div ref={ref} className={`${large ? 'h-106' : 'h-128 shadow-xl border'} w-128 overflow-y-scroll overflow-x-hidden
      scroll-smooth will-change-scroll
      scrollbar-thin
      scrollbar-thumb-neutral-300 scrollbar-track-transparent`}>
      {children}
    </div>
  );
});

export default TransactionList;
