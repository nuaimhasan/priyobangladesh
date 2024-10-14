import { baseApi } from "../api/baseApi";

export const advertiseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdvertise: builder.mutation({
      query: (formData) => ({
        url: `/advertise/add-advertise`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["advertise"],
    }),
    updateAdvertise: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/advertise/update-advertise/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["advertise"],
    }),
    getAllAdvertise: builder.query({
      query: (query) => ({
        url: `/advertise/all-advertise`,
        method: "GET",
        params: query,
      }),
      providesTags: ["advertise"],
    }),
    deleteAdvertise: builder.mutation({
      query: (id) => ({
        url: `/advertise/delete-advertise/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["advertise"],
    }),
    advertiseById: builder.query({
      query: (id) => `/advertise/${id}`,
      providesTags: ["advertise"],
    }),
  }),
});

export const {
  useCreateAdvertiseMutation,
  useUpdateAdvertiseMutation,
  useGetAllAdvertiseQuery,
  useDeleteAdvertiseMutation,
  useAdvertiseByIdQuery,
} = advertiseApi;
