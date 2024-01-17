import { baseApi } from "../api/baseApi";

export const themeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTheme: builder.mutation({
      query: (data) => ({
        url: `/theme/add-theme`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["theme"],
    }),
    updateTheme: builder.mutation({
      query: ({ id, data }) => ({
        url: `/theme/update-theme/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["theme"],
    }),
    getAllTheme: builder.query({
      query: () => `/theme/all-theme`,
      providesTags: ["theme"],
    }),
  }),
});

export const {
  useCreateThemeMutation,
  useUpdateThemeMutation,
  useGetAllThemeQuery,
} = themeApi;
