import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user'

//Khởi tạo redux-store
const store = configureStore({
  reducer: {
    user: userReducer,
}
})

export default store;