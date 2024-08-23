import { baseApi } from "../api/baseApi";

export const subCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubCategory: builder.mutation({
      query: (data) => ({
        url: `/subCategory/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["subCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subCategory/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: (id) => ({
        url: `/subCategory/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subCategory"],
    }),

    getAllSubCategory: builder.query({
      query: () => `/subCategory/all`,
      providesTags: ["subCategory"],
    }),

    getSubCategoryById: builder.query({
      query: (id) => `/subCategory/${id}`,
      providesTags: ["subCategory"],
    }),
  }),
});

export const {
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetAllSubCategoryQuery,
  useGetSubCategoryByIdQuery,
} = subCategoryApi;
