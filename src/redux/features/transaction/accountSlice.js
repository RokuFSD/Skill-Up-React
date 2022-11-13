import { apiSlice } from '../api/apiSlice.js';
import store from '../../app/store.js';
import axios from 'axios';
import apiUrl from '../../../api/index.js';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountByPage: builder.query({
      query: (page) => `${apiUrl}/account?page=${page}`,
      providesTags: (result) =>
        result
          ? [
              ...result?.map(({ id }) => ({
                type: 'Account',
                id
              })),
              'Account'
            ]
          : ['Account']
    }),
    getAllAccounts: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        let counter = 1;
        const { data } = await axios.get(`${apiUrl}/accounts/?page=${counter}`, {
          headers: {
            Authorization: `Bearer ${store.getState().user.adminToken}`
          }
        });
        let finished = data?.nextPage;
        let accounts = [...data?.data];
        while (finished !== null) {
          counter++;
          const { data } = await axios.get(`${apiUrl}/accounts/?page=${counter}`, {
            headers: {
              Authorization: `Bearer ${store.getState().user.adminToken}`
            }
          });
          finished = data?.nextPage;
          accounts = [...accounts, ...data?.data];
        }

        /* Makes a new array with the accounts with no repeated user */
        const uniqueAccounts = [
          ...new Map(accounts.map((account) => [account.userId, account])).values()
        ];

        /* Retrieve the user data with his account */
        const accountsWithUser = await Promise.all(
          uniqueAccounts.map(async (account) => {
            const user = await fetchWithBQ(`/users/${account.userId}`);
            return {
              ...account,
              userData: user?.data
            };
          })
        );

        return { data: accountsWithUser };
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.map(({ id }) => ({
                type: 'Account',
                id
              })),
              'Account'
            ]
          : ['Account']
    }),
    getUserAccount: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result) => (result ? [{ type: 'Account', id: result?.id }] : [])
    }),
    getUserId: builder.query({
      async queryFn({ id }, _arg, _api, _extraOptions) {
        const { data } = await axios.get(`${apiUrl}/accounts/${id}`, {
          headers: {
            Authorization: `Bearer ${store.getState().user.adminToken}`
          }
        });
        return { data: data?.userId };
      },
      providesTags: (result) => (result ? [{ type: 'User', id: result?.userId }] : [])
    })
  })
});

export const { useGetAllAccountsQuery, useGetUserAccountQuery, useGetUserIdQuery } =
  extendedApiSlice;
