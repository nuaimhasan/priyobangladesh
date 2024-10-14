import { baseApi } from "../api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContact: builder.query({
      query: () => ({
        url: "/contact",
      }),
      providesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, contactInfo }) => ({
        url: `/contact/update-contact/${id}`,
        method: "PATCH",
        body: contactInfo,
      }),
      invalidatesTags: ["contact"],
    }),
    addContact: builder.mutation({
      query: (contactInfo) => ({
        url: `/contact/add-contact`,
        method: "POST",
        body: contactInfo,
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useUpdateContactMutation,
  useAddContactMutation,
} = contactApi;
