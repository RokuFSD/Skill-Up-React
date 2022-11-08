import { apiSlice } from '../api/apiSlice.js';
import store from '../../app/store.js';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (page = '') => page ? `transactions/?page=${page}` : '/transactions',
      transformResponse(baseQueryReturnValue, meta, arg) {
        const { data, nextPage } = baseQueryReturnValue;
        return { data, nextPage };
      },
      providesTags: (result) => result ? [{ type: 'Transactions', id: result.id }] : []
    }),
    getAllTransactions: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        let transactions = [];
        let counter = 1;
        try {
          while (true) {
            const { data } = await fetchWithBQ(`transactions/?page=${counter}`, counter);
            transactions = [...transactions, ...data?.data];
            if (!data?.nextPage) break;
            counter++;
          }
          console.log(transactions);
          return transactions;
        } catch (e) {
          console.log(e);
        }
      },
      providesTags: (result) => result ? [{ type: 'Transactions', id: result.id }] : []
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: 'transactions',
        method: 'POST',
        body: transaction
      }),
      invalidatesTags: ['Transaction']
    })
  })
});

export const infinite = (page) => {
  return [...Array(page)].map((_, i) => i + 1).map((page) => {
    return extendedApiSlice.endpoints.getTransactions.select(page)(store.getState()).data?.data;
  }).flat();
};

export const {
  useGetTransactionsQuery,
  useGetAllTransactionsQuery,
  useAddTransactionMutation
} = extendedApiSlice;
