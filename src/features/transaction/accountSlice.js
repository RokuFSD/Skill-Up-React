import { apiSlice } from '../api/apiSlice.js';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountByPage: builder.query({
      query: (page) => `account?page=${page}`,
      providesTags: (result) => result ? [...result?.map(({ id }) => ({
        type: 'Account',
        id
      })), 'Account'] : ['Account']
    }),
    getAllAccounts: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        let counter = 1;
        const { data } = await fetchWithBQ(`accounts/?page=${counter}`, counter);
        let finished = data?.nextPage;
        let accounts = [...data?.data];
        while (finished !== null) {
          counter++;
          const { data } = await fetchWithBQ(`accounts/?page=${counter}`, counter);
          finished = data?.nextPage;
          accounts = [...accounts, ...data?.data];
        }
        /* Filter array unique userId */
        const uniqueAccounts = [...new Map(accounts.map((account) => [account.userId, account])).values()];
        const accountsWithUser = await Promise.all(uniqueAccounts.map(async(account) => {
          const user = await fetchWithBQ(`users/${account.userId}`)
          return {
            ...account,
            userData: user?.data
          }
        }))

        return { data: accountsWithUser };
      },
      providesTags: (result) => result ? [...result?.map(({ id }) => ({
        type: 'Account',
        id
      })), 'Account'] : ['Account']
    }),
    getUserAccount: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result) => result ? [{ type: 'Account', id: result?.id }] : []
    })
  })
});

export const {
  useGetAllAccountsQuery,
  useGetUserAccountQuery
} = extendedApiSlice;
