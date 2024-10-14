import { baseApi } from "../api/baseApi";

export const breakingNewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBreakingNews: builder.mutation({
      query: (data) => ({
        url: `breakingnews/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["breakingnews"],
    }),
    getBreakingNews: builder.query({
      query: () => `breakingnews`,
      providesTags: ["breakingnews"],
    }),
    deleteBreakingNews: builder.mutation({
      query: (id) => ({
        url: `breakingnews/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["breakingnews"],
    }),
  }),
});

export const {
  useAddBreakingNewsMutation,
  useGetBreakingNewsQuery,
  useDeleteBreakingNewsMutation,
} = breakingNewsApi;
