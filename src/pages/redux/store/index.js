
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slice/cartSlice";
import booksApi from "../Slice/BooksApi";
import orderApi from "../Slice/ordersApi";


const store=configureStore({
    reducer:{
        cart:cartReducer,
        [booksApi.reducerPath]:booksApi.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(booksApi.middleware,orderApi.middleware)
})
export default store