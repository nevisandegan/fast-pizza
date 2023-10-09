import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice"
import cartreducer from "../features/cart/cartSlice"

const store = configureStore(
    {
        reducer: {
            user: userReducer,
            cart: cartreducer
        }
    }
)

export default store;