import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // cart: [],

    cart: [
        {
            pizzaId: 12,
            name: "mediterranean",
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        }
    ]
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter(el => el.pizzaId !== action.payload)
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find(el => el.pizzaId === action.payload)
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(el => el.pizzaId === action.payload)
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state,action)
        },
        clearCart(state) {
            state.cart = [];
        }
    }
})


export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart }
    = cartSlice.actions;
export default cartSlice.reducer;



export const getCart = state => state.cart.cart;
export const getUsername = state => state.user.username
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((acc, cur) => cur.quantity + acc
, 0)
export const getTotalCartPrice = (state) => state.cart.cart.reduce((acc, cur) => cur.totalPrice + acc
, 0)

export const getCurrentQuantityById = id => state => 
    state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;
       