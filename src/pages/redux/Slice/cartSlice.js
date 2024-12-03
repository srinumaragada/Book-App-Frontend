import { createSlice } from "@reduxjs/toolkit";
import swal from 'sweetalert';
const initialState = {
    cartItems:[]
}



const cartSlice=createSlice({
     name: "cart",
     initialState,
     reducers:{
            addToCart:(state,action)=>{
               const existingItem=state.cartItems.find(item=>item._id===action.payload._id)
               if(!existingItem) {
                    state.cartItems.push(action.payload);
                    swal("Great!", "Book added Successfully!", "success");
               }else{
                    swal("Book already in cart");
               
               }
            },
            removeItem:(state,action)=>{
               state.cartItems=state.cartItems.filter(item=>item._id !== action.payload._id)
               
            },
            clearItems:(state)=>{
               state.cartItems=[]
            }
     }
})

export const {addToCart,removeItem,clearItems}=cartSlice.actions
export default cartSlice.reducer;