import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HOST } from 'config';

export const petsApi = createApi({
  reducerPath: 'petsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${HOST}/api/user`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.users.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Pets'],
  endpoints: (builder) => ({
    getUserPets: builder.query({
      query: () => '/pets',
      providesTags: ['Pets']
    }),
    postPet: builder.mutation({
      query: (payload) => ({
        url: '/pets',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['Pets']
    }),
    updatePet: builder.mutation({
      query: ({ _id, ...payload }) => ({
        url: `/pets/${_id}`,
        method: 'PATCH',
        body: { ...payload }
      }),
      invalidatesTags: ['Pets']
    }),
    addAvatarToPet: builder.mutation({
      query: (payload) => ({
        url: `/pets/petImage/${payload._id}`,
        method: 'PATCH',
        body: payload.petImage
      }),
      invalidatesTags: ['Pets']
    }),
    deletePet: builder.mutation({
      query: (id) => ({
        url: `/pets/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Pets']
    })
  })
});

export const { useGetUserPetsQuery, usePostPetMutation, useUpdatePetMutation, useAddAvatarToPetMutation, useDeletePetMutation } = petsApi;
