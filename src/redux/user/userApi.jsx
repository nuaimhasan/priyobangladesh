import { baseApi } from "../api/baseApi";
import { userLoggedIn } from "./userSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/user/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("news_token", result?.data?.token);

          dispatch(
            userLoggedIn({
              token: result?.data?.token,
              data: result?.data,
            })
          );
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/profile/${id}`,
        method: "GET",
      }),
    }),
    getUserBySlug: builder.query({
      query: (slug) => ({
        url: `/user/profile/userName/${slug}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin", "writer"],
    }),
    updateUser: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["admin", "writer"],
    }),
    updatePassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update-password/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin", "writer"],
    }),
    // ------------- admin -----------------
    getAdmins: builder.query({
      query: () => ({
        url: "/user/allAdmins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    addAdmin: builder.mutation({
      query: (info) => ({
        url: `/user/add-admin`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["admin"],
    }),

    // ------------- writer -----------------
    getWriters: builder.query({
      query: (query) => ({
        url: "/user/allWriters",
        method: "GET",
        params: query,
      }),
      providesTags: ["writer"],
    }),
    addWriter: builder.mutation({
      query: (info) => ({
        url: `/user/add-writer`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["writer"],
    }),
    updateWriterStatus: builder.mutation({
      query: (id) => ({
        url: `/user/update-status/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["writer"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserByIdQuery,
  useGetUserBySlugQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetAdminsQuery,
  useAddAdminMutation,
  useGetWritersQuery,
  useAddWriterMutation,
  useUpdateWriterStatusMutation,
} = userApi;
