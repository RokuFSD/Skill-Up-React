import { useGetAllTransactionsQuery } from '../../../redux/features/transaction/transactionSlice.js';
import ItemScroll from '../scroll/ItemScroll.jsx';
import { useEffect, useState } from 'react';
import { filterByType } from '../../../utils/functionUtils.js';
import SkeletonTransaction from '../skeletons/SkeletonTransaction.jsx';
import TransactionCard from '../cards/TransactionCard.jsx';
import EmptyList from './EmptyList.jsx';

function MiniList({ limit = 5, type = 'all' }) {
  const [filteredData, setFilteredData] = useState([]);
  const { data, isFetching } = useGetAllTransactionsQuery('');

  useEffect(() => {
    let filtered = data;
    if (isFetching) return;
    if (type !== 'all') {
      filtered = filterByType(filtered, type);
    }
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    setFilteredData(filtered);
  }, [isFetching]);

  if (isFetching) {
    return (
      <ItemScroll large>
        {[...Array(5)].map((_, index) => (
          <SkeletonTransaction key={index} />
        ))}
      </ItemScroll>
    );
  }

  if (!data?.length) {
    return (
      <ItemScroll large>
        <EmptyList large type={type !== 'all'}/>
      </ItemScroll>
    );
  }
  return (
    <ItemScroll large>
      {filteredData.map((transaction) => (
        <TransactionCard key={transaction.id} {...transaction} />
      ))}
    </ItemScroll>
  );
}

export default MiniList;
