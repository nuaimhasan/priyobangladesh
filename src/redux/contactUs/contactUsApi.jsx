import { baseApi } from "../api/baseApi";

export const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation({
      query: (data) => ({
        url: `/contact/add-contact`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contactus"],
    }),
    updateContactUs: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact/update-contact/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["contactus"],
    }),
    getAllContactUs: builder.query({
      query: () => `/contact`,
      providesTags: ["contactus"],
    }),
  }),
});

export const {
  useCreateContactUsMutation,
  useUpdateContactUsMutation,
  useGetAllContactUsQuery,
} = contactUsApi;
