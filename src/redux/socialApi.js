import { baseApi } from "./api/baseApi";

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSocial: builder.mutation({
      query: (data) => ({
        url: `/social/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),
    updateSocial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/social/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["social"],
    }),
    getSocial: builder.query({
      query: () => `/social/all`,
      providesTags: ["social"],
    }),
  }),
});

export const {
  useAddSocialMutation,
  useUpdateSocialMutation,
  useGetSocialQuery,
} = socialApi;
