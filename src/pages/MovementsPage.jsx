import {
  infinite,
  useGetAllTransactionsQuery,
  useGetTransactionsQuery
} from '../features/transaction/transactionSlice.js';
import { filtersArr } from '../components/filter/FilterBar.jsx';
import { useEffect, useState } from 'react';
import { filterByType, filterData, orderByDate } from '../utils/functionUtils.js';
import Searchbar from '../components/search/Searchbar.jsx';
import FilterBar from '../components/filter/FilterBar.jsx';
import InfiniteScroll from '../components/list/InfiniteScroll.jsx';
import TransactionCard from '../components/list/transaction/TransactionCard';

function MovementsPage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(filtersArr);
  const [filteredData, setFilteredData] = useState([]);
  const [triggeredSearch, setTriggeredSearch] = useState(false);
  const [triggeredFilter, setTriggeredFilter] = useState(false);

  const { data, isFetching } = useGetTransactionsQuery(page);
  const { isFetching: isNextDataFetching } = useGetTransactionsQuery(page + 1, { skip: !data?.nextPage });
  const {
    data: allData,
    isFetching: isAllFetching
  } = useGetAllTransactionsQuery('', { skip: !triggeredSearch });

  let result = infinite(page);

  useEffect(() => {
    let filtered = allData;
    if (isAllFetching) return;
    if (query === '') setTriggeredSearch(false);
    if (triggeredFilter) setTriggeredSearch(true);
    filtered = orderByDate(filtered?.slice(), filters[0].value);
    filtered = filterByType(filtered, filters[1].value);
    setFilteredData(filterData(filtered, query, ['concept']));
  }, [triggeredSearch, query, isAllFetching, filters]);

  return (
    <div className='h-full w-128 flex flex-col items-center justify-center mx-auto gap-8'>
      <div className='w-full flex flex-col gap-3 border-b py-2'>
        <Searchbar setQuery={setQuery} setTriggeredSearch={setTriggeredSearch} />
        <FilterBar filters={filters}
                   setFilters={setFilters}
                   setTriggeredSearch={setTriggeredSearch}
                   setTriggeredFilter={setTriggeredFilter}
        />
      </div>
      <InfiniteScroll
        page={page}
        items={triggeredSearch ? filteredData : result}
        hasMore={triggeredSearch ? false : data?.nextPage}
        fetching={triggeredSearch ? isAllFetching : (isFetching || isNextDataFetching)}
        loadMore={triggeredSearch ? null : () => setPage(page + 1)}
        element={<TransactionCard />}
      />

    </div>
  );
}

export default MovementsPage;
