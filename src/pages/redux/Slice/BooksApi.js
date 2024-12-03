import BooksUrl from "../../../utils/booksUrl";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; 

const baseQuery = fetchBaseQuery({
    baseUrl:`${BooksUrl()}/api/books`,
    credentials:"include",
    prepareHeaders:(headers)=>{
        const token=localStorage.getItem("token");
        if(token){
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers;
    }
 })
 const booksApi =createApi({
    reducerPath:"booksApi",
    baseQuery,
    tagTypes:["Books"],
    endpoints:(builder)=>({
       getAllBooks:builder.query({
          query:()=>"/getBooks",
          providesTags:["Books"]
       }),
       getSingleBook:builder.query({
         query:(id)=>`/getOneBook/${id}`,
         providesTags:(result,error,id)=>[{types:"Books",id:id}]
       }),

       addBook:builder.mutation({
         query:(newbook)=>({
            url:"/create-Book",
            method:"POST",
            body:newbook,
         }),
         invalidatesTags:["Books"]
       }),
       updateTheBook:builder.mutation({
         query:({id,...rest})=>({
            url:`/update/${id}`,
            method:"PUT",
            body:rest,
            headers:{
               "Content-Type":"application/json",
            }
         }),
         invalidatesTags:["Books"]
       }),
       deleteBook:builder.mutation({
         query:(id)=>({
               url:`/delete/${id}`,
               method:"DELETE",
         }),
         invalidatesTags:["Books"]
       })
    })

 })
 

 export const {useGetAllBooksQuery,useGetSingleBookQuery,useAddBookMutation,useDeleteBookMutation,useUpdateTheBookMutation}=booksApi
 export default booksApi