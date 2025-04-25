import { configureStore } from "@reduxjs/toolkit";
import coinReducer from '../features/coin/coinSlice';
const store = configureStore({
    reducer:{
        coin:coinReducer
    }
})

export default store