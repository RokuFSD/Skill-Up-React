import { apiSlice } from '../api/apiSlice.js';
import store from '../../app/store.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinyAccount: null,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setDestinyAccount: (state, action) => {
      state.destinyAccount = action.payload;
    },
    removeDestinyAccount: (state) => {
      state.destinyAccount = null;
    }
  }
})

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (page = '') => page ? `transactions/?page=${page}` : '/transactions',
      transformResponse(baseQueryReturnValue, meta, arg) {
        const { data, nextPage } = baseQueryReturnValue;
        return { data, nextPage };
      },
      providesTags: (result) => result ? [...result?.data?.map(({ id }) => ({
        type: 'Transaction',
        id
      })), 'Transaction'] : ['Transaction']
    }),
    getAllTransactions: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        let transactions = [];
        let counter = 1;
        while (true) {
          const { data } = await fetchWithBQ(`transactions/?page=${counter}`, counter);
          transactions = [...transactions, ...data?.data];
          if (!data?.nextPage) break;
          counter++;
        }
        return { data: transactions };
      },
      providesTags: (result) => result ? [...result?.map(({ id }) => ({
        type: 'Transaction',
        id
      })), 'Transaction'] : ['Transaction']
    }),
    getLastThreeAccounts: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        let transactions = [];
        let counter = 1;
        while (transactions.length < 3) {
          const { data } = await fetchWithBQ(`transactions/?page=${counter}`, counter);
          const filtered = data?.data.filter((transaction) => transaction.accountId !== transaction.to_account_id && transaction.type === 'payment' && transaction.userId === store.getState().user.user.id);
          transactions = [...new Map([...transactions, ...filtered].map((transaction) => [transaction.to_account_id, transaction])).values()];
          if (!data?.nextPage) break;
          counter++;
        }
        const lastThreeAccounts = await Promise.all(transactions.map(async (transaction) => {
          const { data } = await fetchWithBQ(`accounts/${transaction.to_account_id}`);
          return data;
        }))
        return { data: lastThreeAccounts };
      }
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
  useGetLastThreeAccountsQuery,
  // useAddTransactionMutation
} = extendedApiSlice;

export const selectDestinyAccount = (state) => state.transaction.destinyAccount;

export const { setDestinyAccount, removeDestinyAccount } = transactionSlice.actions;
export default transactionSlice.reducer;
