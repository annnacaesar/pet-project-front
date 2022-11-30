import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from 'config';

export const sponsorsApi = createApi({
  reducerPath: 'sponsorsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${HOST}/api/sponsor`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().users.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Sponsors'],
  endpoints: (builder) => ({
    getSponsors: builder.query({
      query: () => '/'
    })
  })
});

export const { useGetSponsorsQuery } = sponsorsApi;
