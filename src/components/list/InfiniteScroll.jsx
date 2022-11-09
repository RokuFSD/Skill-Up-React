import { useEffect, useRef } from 'react';
import EmptyList from './EmptyList.jsx';
import TransactionCard from './TransactionCard.jsx';
import TransactionList from './TransactionList.jsx';
import SkeletonTransaction from '../skeleton/SkeletonTransaction.jsx';

function getScrollBottom(element) {
  let scrollTop = element.scrollTop;
  let scrollHeight = element.scrollHeight;
  let clientHeight = element.clientHeight;
  return scrollHeight - scrollTop - clientHeight;
}

function InfiniteScroll({ page, items, loadMore, hasMore, fetching }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref?.current || !hasMore) return;
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

  if (fetching && (items?.length < 2)) {
    return (
      <TransactionList ref={null}>
        {[...Array(5)].map((_, index) => (<SkeletonTransaction key={index} />))}
      </TransactionList>
    );
  }

  return (
    <TransactionList ref={ref}>
      {items?.length === 0 ? <EmptyList /> : items?.map((item) => <TransactionCard key={item?.id} {...item} />)}
    </TransactionList>
  );
}

export default InfiniteScroll;
