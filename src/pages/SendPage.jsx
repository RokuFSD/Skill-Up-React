import InfiniteScroll from '../components/list/InfiniteScroll.jsx';
import { useEffect, useState } from 'react';
import { useGetAllAccountsQuery } from '../features/transaction/accountSlice.js';
import Searchbar from '../components/list/Searchbar';
import AccountCard from '../components/list/account/AccountCard.jsx';
import Button from '../components/button/Button';

function SendPage() {
  const { data, isFetching } = useGetAllAccountsQuery('');
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [lastIndex, setLastIndex] = useState(10);
  const [triggeredSearch, setTriggeredSearch] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

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
      return item?.userData['first_name'].toLowerCase().includes(query.toLowerCase()) || item?.userData['last_name'].toLowerCase().includes(query.toLowerCase());
    });
    setFilteredData(newData);

  }, [isFetching, query, data, triggeredSearch]);


  return (
    <div className='w-128 h-full flex flex-col items-center justify-center gap-8 mx-auto'>
      <Searchbar setQuery={setQuery} setTriggeredSearch={setTriggeredSearch} />
      <div className='h-144 w-full flex flex-col gap-4'>
        <InfiniteScroll
          page={0}
          items={triggeredSearch ? filteredData : currentData}
          hasMore={false}
          fetching={isFetching}
          loadMore={null}
          element={<AccountCard />}
        />
        {!triggeredSearch && !isFetching &&
          <div className='flex items-center justify-center h-12'>
            <Button
              type='button'
              style='primary'
              onClick={() => onPageSelected(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            {page + 1} of {totalPages}
            <Button
              type='button'
              style='primary'
              onClick={() => onPageSelected(page + 1)}
              disabled={page + 1 === totalPages}
            >
              Next
            </Button>
          </div>
        }
      </div>
    </div>
  );
}

export default SendPage;
