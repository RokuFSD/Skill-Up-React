import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import apiUrl from '../../../api/index.js';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: apiUrl, prepareHeaders: (headers, { getState }) => {
          const token = getState().user.userToken;
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }
          return headers;
        }
      }
    ),
    tagTypes: ['Transaction', 'Account'],
    endpoints: () => ({})
  })
;


