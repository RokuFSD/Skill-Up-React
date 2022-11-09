import {
  infinite,
  useGetAllTransactionsQuery,
  useGetTransactionsQuery
} from '../features/movement/transactionSlice.js';
import { useEffect, useState } from 'react';
import { filterData } from '../utils/functionUtils.js';
import InfiniteScroll from '../components/list/InfiniteScroll.jsx';
import Searchbar from '../components/list/Searchbar.jsx';

function MovementsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [triggeredSearch, setTriggeredSearch] = useState(false);

  const { data, isFetching } = useGetTransactionsQuery(page);
  const { isFetching: isNextDataFetching } = useGetTransactionsQuery(page + 1, { skip: !data?.nextPage });
  const { data: allData, isFetching: isAllFetching } = useGetAllTransactionsQuery('', { skip: !triggeredSearch });

  let result = infinite(page);

  useEffect(() => {
    if (isAllFetching || !triggeredSearch) return;
    if (query === '') setTriggeredSearch(false);
    setFilteredData(filterData(allData, query));
  }, [triggeredSearch, query, isAllFetching]);

  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-10'>
      <Searchbar setQuery={setQuery} setTriggeredSearch={setTriggeredSearch} />
      <InfiniteScroll fetching={triggeredSearch ? isAllFetching : (isFetching || isNextDataFetching)}
                      page={page}
                      items={triggeredSearch ? filteredData : result}
                      loadMore={triggeredSearch ? null : () => setPage((prevState) => prevState + 1)}
                      hasMore={triggeredSearch ? false : data?.nextPage}
      />
    </div>
  );
}

export default MovementsPage;
