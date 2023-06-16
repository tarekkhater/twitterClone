import slice from './Slices';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer:{
        info : slice,
    }
})
export default store;