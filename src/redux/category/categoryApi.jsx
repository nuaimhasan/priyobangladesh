import { baseApi } from "../api/baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/category/add-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
    getAllCategory: builder.query({
      query: () => `/category/all-category`,
      providesTags: ["category"],
    }),
    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
