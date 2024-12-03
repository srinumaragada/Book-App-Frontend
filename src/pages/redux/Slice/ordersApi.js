import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BooksUrl from "../../../utils/booksUrl";

 const orderApi=createApi({
    reducerPath:"orderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${BooksUrl()}/api/orders`,
        credentials:"include",
    }),
    tagTypes:["Orders"],

    endpoints:(builder)=>(
        {
            createOrder:builder.mutation({
                query:(newOrder)=>(
                    {
                        url:"/order",
                        method:"POST",
                        body:newOrder
                    }
                )
                
            }),
            getBookByEmail:builder.query({
                    query:(email)=>({
                        url:`/order/${email}`
                    }),
                    providesTags:["Orders"]
            })
        }
    )
 })

 export const {useCreateOrderMutation ,useGetBookByEmailQuery} = orderApi;
 export default orderApi;