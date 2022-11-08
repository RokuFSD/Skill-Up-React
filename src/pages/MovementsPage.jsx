import { useGetTransactionsQuery } from '../features/movement/transactionSlice.js';
import { infinite } from '../features/movement/transactionSlice.js';
import { useState } from 'react';
import InfiniteScroll from '../components/list/InfiniteScroll.jsx';

function MovementsPage() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useGetTransactionsQuery(page);
  const { isFetching: isNextDataFetching } = useGetTransactionsQuery(page + 1, { skip: !data?.nextPage });
  const result = infinite(page);

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <InfiniteScroll fetching={isFetching || isNextDataFetching}
                      page={page}
                      items={result}
                      loadMore={() => setPage((prevState) => prevState + 1)}
                      hasMore={data?.nextPage}
      />
    </div>
  );
}

export default MovementsPage;
