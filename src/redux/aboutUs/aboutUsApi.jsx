import { baseApi } from "../api/baseApi";

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAboutUs: builder.mutation({
      query: (formData) => ({
        url: `/about/add-about`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["aboutUs"],
    }),
    updateAboutUs: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/about/update-about/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["aboutUs"],
    }),
    getAllAboutUs: builder.query({
      query: () => `/about`,
      providesTags: ["aboutUs"],
    }),
  }),
});

export const {
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
  useGetAllAboutUsQuery,
} = aboutUsApi;
