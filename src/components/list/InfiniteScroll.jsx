import { useEffect, useRef } from 'react';
import TransactionCard from './TransactionCard.jsx';

function getScrollBottom(element) {
  let scrollTop = element.scrollTop;
  let scrollHeight = element.scrollHeight;
  let clientHeight = element.clientHeight;
  return scrollHeight - scrollTop - clientHeight;
}

function InfiniteScroll({ page, items, loadMore, hasMore, fetching }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref?.current) return;
    let isSend = true;

    function handleScroll() {
      if (isSend && getScrollBottom(ref.current) < 10 && hasMore && !fetching) {
        isSend = false;
        loadMore();
      }
    }

    ref.current?.addEventListener('scroll', handleScroll);
    return () => ref.current?.removeEventListener('scroll', handleScroll);
  }, [items, page, hasMore, ref.current]);

  if (fetching && (items.length < 2)) return <div>Loading...</div>;

  return (
    <section
      ref={ref}
      className='h-128 w-128 overflow-y-scroll overflow-x-hidden shadow-xl
      border scroll-smooth will-change-scroll
      scrollbar-thin
      scrollbar-thumb-neutral-300 scrollbar-track-transparent'>
      {items.map((item) => (
        <TransactionCard key={item.id} {...item} />
      ))}
      {(fetching && items?.length) && <div>Loading...</div>}
    </section>
  );
}

export default InfiniteScroll;
