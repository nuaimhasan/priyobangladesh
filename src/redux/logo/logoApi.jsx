import { baseApi } from "../api/baseApi";

export const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLogo: builder.mutation({
      query: (formData) => ({
        url: `/logo/add-logo`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
    updateLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/logo/update-logo/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["logo"],
    }),
    getAllLogo: builder.query({
      query: () => `/logo/all-logo`,
      providesTags: ["logo"],
    }),
  }),
});

export const {
  useCreateLogoMutation,
  useUpdateLogoMutation,
  useGetAllLogoQuery,
} = logoApi;
