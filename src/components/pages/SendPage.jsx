import InfiniteScroll from '../layout/scroll/InfiniteScroll.jsx';
import { useEffect, useState } from 'react';
import { useGetAllAccountsQuery } from '../../redux/features/transaction/accountSlice.js';
import Searchbar from '../filter/Searchbar.jsx';
import AccountCard from '../layout/cards/AccountCard.jsx';
import Button from '../layout/buttons/Button.jsx';

function SendPage({ handleToggle }) {
  const { data, isFetching } = useGetAllAccountsQuery('');
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [lastIndex, setLastIndex] = useState(10);
  const [triggeredSearch, setTriggeredSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  // Variables for pagination
  const allAccounts = data?.length;
  const totalPages = Math.ceil(allAccounts / 10);

  let currentData = data?.slice(page * 10, lastIndex);

  function onPageSelected(newPage) {
    setLastIndex(page < newPage ? lastIndex + 10 : lastIndex - 10);
    setPage(newPage);
  }

  useEffect(() => {
    let filtered = data;
    if (isFetching || !triggeredSearch) return;
    if (query === '') setTriggeredSearch(false);
    const newData = filtered.filter((item) => {
      if (typeof item?.userData['first_name'] === 'string' && typeof item?.userData['last_name'] === 'string') {
        return (
          item?.userData['first_name'].toLowerCase().includes(query.toLowerCase()) ||
          item?.userData['last_name'].toLowerCase().includes(query.toLowerCase())
        );
      }
    });
    setFilteredData(newData);
  }, [isFetching, query, data, triggeredSearch]);

  return (
    <div className='w-full max-w-full h-full flex flex-col items-center justify-center gap-4'>
      <Searchbar setQuery={setQuery} setTriggeredSearch={setTriggeredSearch} />
      <div className='will-change-scroll rounded-md h-144 w-full flex flex-col gap-4 bg-gradient-to-b from-sky-100 ...'>
        <InfiniteScroll
          page={0}
          items={triggeredSearch ? filteredData : currentData}
          hasMore={false}
          fetching={isFetching}
          loadMore={null}
          element={<AccountCard {...{ handleToggle }} />}
        />
        {!triggeredSearch && !isFetching && (
          <div className='flex items-center justify-center h-12'>
            <Button
              type='button'
              style='primary'
              onClick={() => onPageSelected(page - 1)}
              disabled={page === 0}>
              Previous
            </Button>
            {page + 1} of {totalPages}
            <Button
              type='button'
              style='primary'
              onClick={() => onPageSelected(page + 1)}
              disabled={page + 1 === totalPages}>
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SendPage;
