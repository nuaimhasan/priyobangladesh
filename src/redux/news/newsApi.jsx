import { baseApi } from "../api/baseApi";

export const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNews: builder.mutation({
      query: (formData) => ({
        url: `/news/add-news`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["news"],
    }),
    updateNews: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/news/update-news/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["news"],
    }),
    deleteNews: builder.mutation({
      query: (newsId) => ({
        url: `/news/delete-news/${newsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["news"],
    }),
    getAllNews: builder.query({
      query: (query) => ({
        url: `/news/all-news`,
        method: "GET",
        params: query,
      }),
      providesTags: ["news"],
    }),
    getNewsById: builder.query({
      query: (newsId) => `/news/${newsId}`,
      providesTags: ["news"],
    }),
    getNewsBySlug: builder.query({
      query: (slug) => `/news/newsBySlug/${slug}`,
      providesTags: ["news"],
    }),
    updateStatus: builder.mutation({
      query: (id) => ({
        url: `/news/status-change/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["news"],
    }),
    getNewsByWriter: builder.query({
      query: (writerId) => `/news/writer/${writerId}`,
      providesTags: ["news"],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useGetAllNewsQuery,
  useGetNewsByIdQuery,
  useGetNewsBySlugQuery,
  useUpdateStatusMutation,
  useGetNewsByWriterQuery,
} = newsApi;
