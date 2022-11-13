import React, { useEffect, useRef } from 'react';
import EmptyList from '../lists/EmptyList.jsx';
import ItemScroll from './ItemScroll.jsx';
import SkeletonTransaction from '../skeletons/SkeletonTransaction.jsx';

function getScrollBottom(element) {
  let scrollTop = element.scrollTop;
  let scrollHeight = element.scrollHeight;
  let clientHeight = element.clientHeight;
  return scrollHeight - scrollTop - clientHeight;
}

function InfiniteScroll({ page, items, loadMore, hasMore, fetching, element }) {
  const ref = useRef(null);

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

  if (fetching && (items?.length < 2 || !items)) {
    return (
      <ItemScroll ref={null}>
        {[...Array(5)].map((_, index) => (
          <SkeletonTransaction key={index} />
        ))}
      </ItemScroll>
    );
  }

  return (
    <ItemScroll ref={ref}>
      {items?.length === 0 ? (
        <EmptyList />
      ) : (
        items?.map((item) => React.cloneElement(element, { key: item.id, id: item.id, ...item }))
      )}
    </ItemScroll>
  );
}

export default InfiniteScroll;
