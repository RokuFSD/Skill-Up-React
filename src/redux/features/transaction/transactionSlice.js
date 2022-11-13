import store from '../../app/store.js';
import axios from 'axios';
import apiUrl from '../../../api/index.js';
import { apiSlice } from '../api/apiSlice.js';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  destinyAccount: null
};

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
});

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (page = '') => (page ? `/transactions/?page=${page}` : '/transactions'),
      transformResponse(baseQueryReturnValue) {
        const { data, nextPage } = baseQueryReturnValue;
        return { data, nextPage };
      },
      providesTags: ['Transaction']
    }),
    getAllTransactions: builder.query({
      async queryFn(_arg, _api, _extraOptions, fethWithBQ) {
        let transactions = [];
        let counter = 1;
        while (true) {
          const { data } = await fethWithBQ(`/transactions/?page=${counter}`, counter);
          transactions = [...transactions, ...data?.data];
          if (!data?.nextPage) break;
          counter++;
        }
        return { data: transactions };
      },
      providesTags: ['Transaction']
    }),

    /* Retrieve the last accounts who receive a transaction from the user*/
    getLastThreeAccounts: builder.query({
      async queryFn(_arg, _api, _extraOptions, fethWithBQ) {
        let transactions = [];
        let counter = 1;
        while (transactions.length < 3) {
          const { data } = await fethWithBQ(`/transactions/?page=${counter}`, counter);
          const filtered = data?.data.filter((transaction) => transaction.accountId !== transaction.to_account_id && transaction.type === 'payment' && transaction.userId === store.getState().user.user.id);
          transactions = [...new Map([...transactions, ...filtered].map((transaction) => [transaction.to_account_id, transaction])).values()];
          if (!data?.nextPage) break;
          counter++;
        }
        const lastThreeAccounts = await Promise.all(transactions.map(async (transaction) => {
          const { data } = await axios.get(`${apiUrl}/accounts/${transaction.to_account_id}`, {
            headers: {
              'authorization': `Bearer ${store.getState().user.adminToken}`
            }
          });
          return data;
        }));
        return { data: lastThreeAccounts };
      }
    }),
    modifyTransaction: builder.mutation({
      async queryFn({ id, data }, _api, _extraOptions) {
        const response = await axios.put(`${apiUrl}/transactions/${id}`, data, {
          headers: {
            'authorization': `Bearer ${store.getState().user.adminToken}`
          }
        });
        return response.data;
      },
      invalidatesTags: ['Transaction']
    })
  })
});

/*
* InfiniteScroll function
* Returns the transactions from the state when page changes
*  */

export const infinite = (page) => {
  return [...Array(page)].map((_, i) => i + 1).map((page) => {
    return extendedApiSlice.endpoints.getTransactions.select(page)(store.getState()).data?.data;
  }).flat();
};

export const {
  useGetTransactionsQuery,
  useGetAllTransactionsQuery,
  useGetLastThreeAccountsQuery,
  useModifyTransactionMutation
} = extendedApiSlice;

export const selectDestinyAccount = (state) => state.transaction.destinyAccount;

export const { setDestinyAccount, removeDestinyAccount } = transactionSlice.actions;
export default transactionSlice.reducer;
